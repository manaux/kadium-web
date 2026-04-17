import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Category, displayedColumns, staticData } from '../config';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EntityType, IEntityConfig } from 'src/app/shared/interfaces/entity.interface';
import { EntityService } from 'src/app/shared/services/entity.service';
import { combineLatest, Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { IComplex } from '@interfaces/*';
import { EntityState } from 'src/app/shared/store/entity/entity.state';
import { filter } from 'rxjs/operators';
import { SetCurrentCategory } from 'src/app/shared/store/entity/entity.actions';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})

export class EntitiesComponent implements OnInit {
  dataSource!: MatTableDataSource<EntityType>;
  config!: IEntityConfig;
  entityName!: Category;
  displayedColumns!: string[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Select(EntityState.getCurrentComplex) currentComplex$!: Observable<IComplex | null>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private entityService: EntityService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    combineLatest([this.route.params, this.currentComplex$]).pipe(
      filter((data) => !!data[1])
    ).subscribe(([params, complex]) => {
      this.entityName = (params as Params)['entity'];
      this.store.dispatch(new SetCurrentCategory(this.entityName));
      this.config = staticData[this.entityName];

      if (!this.config) { // entity from route doesn't exist
        this.router.navigate(['/error']);
        return;
      }

      this.displayedColumns = displayedColumns[this.entityName];
      this.entityService.list<EntityType>(this.config.db, this.config.complexInPath ? complex?.id : '').subscribe((data) => {
        const source = this.config.userInPath ? this.entityService.parseByUserId(data as any) : data;
        this.dataSource = new MatTableDataSource(source);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  goToEntity(entity: EntityType) {
    this.router.navigate([this.entityName, entity.id]);
  }
}
