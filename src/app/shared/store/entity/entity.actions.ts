import { IComplex } from "@interfaces/*";
import { Category } from "src/app/entities/config";
import { EntityType } from "../../interfaces/entity.interface";

export class SetCurrentComplex {
  static readonly type = '[Complex] SetCurrentComplex';
  constructor(public currentComplex: IComplex) { }
}

export class SetCurrentCategory {
  static readonly type = '[Complex] SetCurrentCategory';
  constructor(public category: Category) { }
}

export class SetCurrentEntity {
  static readonly type = '[Complex] SetCurrentEntity';
  constructor(public entity: EntityType) { }
}