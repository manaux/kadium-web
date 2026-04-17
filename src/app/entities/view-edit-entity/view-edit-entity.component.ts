import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityType, IEntityConfig, UserEntityType } from 'src/app/shared/interfaces/entity.interface';
import { Category, staticData } from '../config';
import { FormBuilder } from '@angular/forms';
import { EntityService } from 'src/app/shared/services/entity.service';
import { IComplex, RequestStatus } from '@interfaces/*';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { EntityState } from 'src/app/shared/store/entity/entity.state';
import { skip, takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { SetCurrentCategory } from 'src/app/shared/store/entity/entity.actions';

@Component({
  selector: 'app-view-edit-entity',
  templateUrl: './view-edit-entity.component.html',
  styleUrls: ['./view-edit-entity.component.scss']
})
export class ViewEditEntityComponent implements OnInit, OnDestroy {
  @Select(EntityState.getCurrentComplex) currentComplex$!: Observable<IComplex | null>;
  readonly Category = Category;

  entityName!: Category;
  id!: string;
  config!: IEntityConfig;
  entity!: Partial<EntityType>;
  userId = 'admin';

  entityForm = this.fb.group({});

  private complexId!: string;
  private destroyed$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private entityService: EntityService,
    private store: Store,
    private datePipe: DatePipe,
  ) { }

  get title(): string {
    return this.entity ? (this.entity as any)[this.config.titleColumnName] : 'Новий';
  }

  ngOnInit(): void {
    this.entityName = this.route.snapshot.params?.entity;
    this.store.dispatch(new SetCurrentCategory(this.entityName));
    this.id = this.route.snapshot.params?.id;
    this.complexId = this.store.selectSnapshot(EntityState.getCurrentComplex)?.id || '';
    this.currentComplex$.pipe(
      skip(1),
      takeUntil(this.destroyed$),
    ).subscribe(() => this.router.navigate([this.entityName]));

    this.config = staticData[this.entityName];

    if (!this.config) { // entity from route doesn't exist
      this.router.navigate(['/error']);
      return;
    }

    const columns = this.config.columns.map(({ name }) => name);

    for (let column of columns) {
      this.entityForm.addControl(column, this.fb.control(null));
    }

    if (this.id) {
      this.entityService.get<EntityType>(this.config.db, this.config.userInPath ? '' : this.id, this.config.complexInPath && this.complexId || '').subscribe((data) => {
        if (data) {
          if (this.config.userInPath) {
            const allUsersEntities = this.entityService.parseByUserId(data as any);
            const parsed = this.entityService.findById(allUsersEntities, this.id);

            if (!parsed) {
              this.router.navigate(['/error']);
              return;
            }
            this.entity = parsed;
          } else {
            this.entity = data;
          }

          this.entityForm.patchValue(this.entity);
        } else {
          this.router.navigate(['/error']);
          return;
        }
      });
    } else {
      this.replaceDatetimeWithCurrent();
    }
  }

  save(): void {
    if (!this.id) {
      this.id = this.entityService.generateId();
      this.entity = this.getNewEntity(this.id);
    }

    this.entityService.update(this.config.db, this.id, this.getFullEntity(), this.getUserOrComplexId());

    this.router.navigate([this.entityName]);
  }

  duplicate() {
    const newId = this.entityService.generateId();
    this.replaceDatetimeWithCurrent();
    const newEntity = {
      ...this.getFullEntity(),
      ...this.getNewEntity(newId),
    }

    this.entityService.update(this.config.db, newId, newEntity, this.getUserOrComplexId());
    this.router.navigate([this.entityName, newId]);
  }

  delete() {
    this.entityService.delete(this.config.db, this.id, this.getUserOrComplexId());
    this.router.navigate([this.entityName]);
  }

  private getNewEntity(id: string): Partial<EntityType> {
    return {
      id,
      ...(this.config.complexInPath ? { complexId: this.complexId } : {}),
      ...(this.config.userInPath ? { userId: this.userId } : {}),
    }
  }

  private getFullEntity(): EntityType {
    const formValue = this.entityForm.value;

    this.config.columns.filter((column) => column.type === 'number').forEach((column) => {
      formValue[column.name] = parseInt(formValue[column.name]);
    });

    return {
      ...this.entity,
      ...formValue,
    }
  }

  private replaceDatetimeWithCurrent() {
    this.config.columns.forEach((column) => {
      if (column.type === 'datetime') {
        this.entity = {
          [column.name]: new Date(),
        }
        this.entityForm.controls[column.name].setValue((this.entity as any)[column.name]);
      }
    });
  }

  get showApproveReject(): boolean {
    return !!this.id && (['requests', 'apartments'].includes(this.entityName));
  }

  get showApprove(): boolean {
    return this.showApproveReject && (this.entity as UserEntityType)?.status !== RequestStatus.APPROVED;
  }

  get showReject(): boolean {
    return this.showApproveReject && (this.entity as UserEntityType)?.status !== RequestStatus.REJECT;
  }

  get statusClass(): string {
    return 'status-' + (this.entity as UserEntityType)?.status?.toLowerCase();
  }

  getDatetime(columnName: string): string {
    if (!this.entity) return '';
    return this.datePipe.transform((this.entity as any)[columnName], 'dd.MM.yyyy, H:mm') || '';
  }

  approve() {
    this.updateStatus(RequestStatus.APPROVED);
  }

  reject() {
    this.updateStatus(RequestStatus.REJECT);
  }

  updateStatus(status: RequestStatus) {
    this.entityService.update(this.config.db, this.id, {
      ...this.entity,
      ...this.entityForm.value,
      status,
    }, this.getUserOrComplexId());
  }

  private getUserOrComplexId(): string {
    return this.config.complexInPath ? this.complexId : this.config.userInPath ? (this.entity as UserEntityType).userId : '';
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
