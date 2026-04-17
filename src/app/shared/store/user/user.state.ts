import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "@interfaces/*";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { take } from "rxjs/operators";
import { CookieService } from "../../services/cookie.service";
import { EntityService } from "../../services/entity.service";
import { AddUser, LoadUserFromCookie, Logout, SetCurrentUser } from "./user.actions";


export interface UserStateModel {
  currentUser: IUser | null;
  uid: string | null;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    currentUser: null,
    uid: null,
  },
})
@Injectable()
export class UserState {
  readonly cookie = 'uid';
  readonly dbPath = '/user';

  constructor(
    private entityService: EntityService,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  @Selector()
  static getCurrentUser(state: UserStateModel): IUser | null {
    return state.currentUser;
  }

  @Selector()
  static getUid(state: UserStateModel): string | null {
    return state.uid;
  }

  @Action(LoadUserFromCookie)
  loadUserFromCookie(cntx: StateContext<UserStateModel>) {
    if (cntx.getState().currentUser) return;

    const userFromCookie = this.cookieService.getCookie(this.cookie);
    if (userFromCookie) {
      cntx.patchState({ uid: userFromCookie });

      this.entityService.get<IUser>(this.dbPath, userFromCookie).pipe(take(1)).subscribe((user) => {
        if (!user) {
          this.goToLogin();
          return;
        }
        cntx.dispatch(new SetCurrentUser(user))
        this.cookieService.setCookie(this.cookie, userFromCookie, 1);
      });
    }
  }

  @Action(AddUser)
  addUser(cntx: StateContext<UserStateModel>, { user }: AddUser) {
    this.entityService.update(this.dbPath, user.id, user);
    cntx.dispatch(new SetCurrentUser(user));
  }

  @Action(SetCurrentUser)
  setCurrentUser({ patchState }: StateContext<UserStateModel>, { user }: SetCurrentUser) {
    this.cookieService.setCookie(this.cookie, user.id, 1);
    patchState({ uid: user.id, currentUser: user });
  }

  @Action(Logout)
  logout({ patchState }: StateContext<UserStateModel>) {
    this.cookieService.eraseCookie(this.cookie);
    patchState({ uid: null, currentUser: null });
    this.goToLogin();
  }

  private goToLogin() {
    this.router.navigate(['login']);
  }

}