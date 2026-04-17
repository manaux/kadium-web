import { Category } from "src/app/entities/config";
import { ICamera, IComplex, IContact, IEntrance, IHouse, INews, IRequest, IUserApartment, IUser } from ".";

export type EntityType = ICamera | IComplex | IContact | IEntrance | IHouse | INews | IRequest | IUserApartment | IUser;

export type UserEntityType = IRequest | IUserApartment;

export interface IEntitySettings extends Record<Category, IEntityConfig> { }

export interface IEntityConfig {
  title: string;
  db: string;
  complexInPath?: boolean;
  userInPath?: boolean;
  titleColumnName: string;
  disableCreate?: boolean;
  columns: IColumn[],
}

export interface IColumn {
  name: string;
  title: string;
  type?: 'datetime' | 'status' | 'link' | 'number';
  transform?: (value: any) => string;
  placeholder?: string;
}