import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IComplex, IRequest, IUser, IUserApartment, RequestStatus } from '@interfaces/*';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category, staticData } from '../entities/config';
import { EntityService } from '../shared/services/entity.service';
import { SetCurrentComplex } from '../shared/store/entity/entity.actions';
import { EntityState } from '../shared/store/entity/entity.state';
import { Logout } from '../shared/store/user/user.actions';
import { UserState } from '../shared/store/user/user.state';
import { menu } from './config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Select(UserState.getCurrentUser) user$!: Observable<IUser | null>;
  @Select(EntityState.getCurrentComplex) currentComplex$!: Observable<IComplex | null>;
  @Select(EntityState.getCurrentCategory) category$!: Observable<Category>;

  public MENU = menu;
  public complexes: IComplex[] = [];
  public isComplexesPage = true;

  private destroyed$ = new Subject();

  constructor(
    private entityService: EntityService,
    private store: Store,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.entityService.list<IComplex>(staticData.complexes.db).pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.complexes = data;
      this.setCurrentComplex(data[0]);
    });

    combineLatest([
      this.entityService.list<IRequest>(staticData.requests.db),
      this.currentComplex$,
    ]).pipe(takeUntil(this.destroyed$)).subscribe(([data, complex]) => {
      const source = this.entityService.parseByUserId(data as any);
      this.MENU[7].counter = source?.filter((item) => {
        const request = item as IRequest;
        return (request.status === RequestStatus.INSPECTION) && (request.complexId === complex?.id);
      })?.length;
    });

    combineLatest([
      this.entityService.list<IUserApartment>(staticData.apartments.db),
      this.currentComplex$,
    ]).pipe(takeUntil(this.destroyed$)).subscribe(([data, complex]) => {
      const source = this.entityService.parseByUserId(data as any);
      this.MENU[6].counter = source?.filter((item) => {
        const apartment = item as IUserApartment;
        return (apartment.status === RequestStatus.INSPECTION) && (apartment.complexId === complex?.id);
      })?.length;
    });

    this.category$.pipe(takeUntil(this.destroyed$)).subscribe((category) => this.isComplexesPage = category === Category.complexes);
  }

  setCurrentComplex(complex: IComplex): void {
    this.store.dispatch(new SetCurrentComplex(complex));
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
