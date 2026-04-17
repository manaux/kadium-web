import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { EntityType } from '../interfaces/entity.interface';

@Injectable({
  providedIn: 'root',
})
export class EntityService {

  constructor(
    private db: AngularFireDatabase,
  ) { }

  list<T>(dbName: string, complexId?: string): Observable<T[]> {
    const url = dbName + this.addToPathIfExists(complexId);
    return this.db.list<T>(url).valueChanges();
  }

  get<T>(dbName: string, id: string, complexId?: string): Observable<T> {
    const url = `${dbName}` + this.addToPathIfExists(complexId) + this.addToPathIfExists(id);
    return this.db.list<T>(url).snapshotChanges()
      .pipe(
        map((value) => {
          const result: Record<string, any> = {};
          value.forEach((v) =>
            result[v.payload.key || ''] = v.payload.val()
          );
          return result as T;
        })
      );
  }

  generateId(): string {
    return this.db.createPushId();
  }

  update(dbName: string, id: string, data: Partial<EntityType>, complexOrUserId?: string): void {
    const url = dbName + this.addToPathIfExists(complexOrUserId);
    this.db.list(url).update(id, data);
  }

  delete(dbName: string, id: string, complexId?: string): void {
    const url = dbName + this.addToPathIfExists(complexId);
    this.db.list(url).remove(id);
  }

  parseByUserId(entities: Record<string, EntityType>[]): EntityType[] {
    const parsed: EntityType[] = [];
    Object.values(entities).forEach((userEntities) => parsed.push(...Object.values(userEntities)));

    return parsed;
  }

  findById(entities: EntityType[], idToFind: string): EntityType | undefined {
    return entities.find(({ id }) => id === idToFind);
  }

  private addToPathIfExists(param: string | undefined): string {
    return param ? `/${param}` : '';
  }
}
