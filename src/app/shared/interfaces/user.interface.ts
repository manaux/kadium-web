export interface IUser {
  id: string;
  name?: string;
  rights: UserRights;
  phone: string;
}

export enum UserRights {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const UserRightsTitle: Record<UserRights, string> = {
  ADMIN: 'Адмін',
  USER: 'Користувач',
}