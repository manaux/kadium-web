import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CustomPaginatorIntl } from './custom-mat-paginator-intl.service';
import { MatMenuModule } from '@angular/material/menu';


const imports = [
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
]

@NgModule({
  declarations: [],
  imports: imports,
  exports: imports,
  providers: [{
    provide: MatPaginatorIntl,
    useClass: CustomPaginatorIntl,
  }]
})

export class MaterialModule { }
