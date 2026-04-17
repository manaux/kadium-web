import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import "firebase/auth";
import { FormBuilder, Validators } from "@angular/forms";
import firebase from "firebase";
import ConfirmationResult = firebase.auth.ConfirmationResult;
import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IUser, UserRights } from '@interfaces/*';
import { Store } from '@ngxs/store';
import { AddUser, SetCurrentUser } from '../shared/store/user/user.actions';
import { UserState } from '../shared/store/user/user.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  singInForm = this.fb.group({
    number: this.fb.control([], Validators.required),
    code: this.fb.control([], Validators.required),
  });

  confirmationResult!: ConfirmationResult;

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    if (this.store.selectSnapshot(UserState.getUid)) {
      this.goToComplexes();
      return;
    }

    firebase.initializeApp(environment.firebaseConfig);

    (window as any).recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response: any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log('reCAPTCHA solved');
      }
    });
  }

  sendCode() {
    this.auth.signInWithPhoneNumber(this.singInForm.controls.number.value, (window as any).recaptchaVerifier)
      .then((confirmationResult: ConfirmationResult) => {
        this.confirmationResult = confirmationResult;
        console.log(confirmationResult);
      });
  }

  signIn() {
    if (!this.confirmationResult) return;

    this.confirmationResult.confirm(this.singInForm.controls.code.value)
      .then((result: UserCredential) => {

        const user: IUser = {
          id: result.user?.uid || '',
          phone: result.user?.phoneNumber || '',
          rights: UserRights.USER,
        }

        if (!user.id || !user.phone) {
          this.router.navigate(['error']);
          return;
        }

        if (result.additionalUserInfo?.isNewUser) {
          this.store.dispatch(new AddUser(user));
        } else {
          this.store.dispatch(new SetCurrentUser(user))
        }

        this.goToComplexes();
      }).catch((error) => {
        console.log(error);
      });
  }

  private goToComplexes() {
    this.router.navigate(['/complexes']);
  }
}
