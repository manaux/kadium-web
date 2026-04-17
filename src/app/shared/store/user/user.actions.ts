import { IUser } from "@interfaces/*";

export class LoadUserFromCookie {
  static readonly type = '[User] LoadUserFromCookie';
  constructor() { }
}

export class AddUser {
  static readonly type = '[User] AddUser';
  constructor(public user: IUser) { }
}

export class SetCurrentUser {
  static readonly type = '[User] SetCurrentUser';
  constructor(public user: IUser) { }
}

export class Logout {
  static readonly type = '[User] Logout';
  constructor() { }
}