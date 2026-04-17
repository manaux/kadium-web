import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserState } from '../store/user/user.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  constructor(
    private store: Store,
    public router: Router,
  ) { }

  canActivate(): boolean {
    if (!this.store.selectSnapshot(UserState.getUid)) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}