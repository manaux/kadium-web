import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class CustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = `Перша`;
  itemsPerPageLabel = `Позицій на сторінці`;
  lastPageLabel = `Остання`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Наступна';
  previousPageLabel = 'Попередня';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return ``;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Cторінка ${page + 1} з ${amountPages}`;
  }
}
