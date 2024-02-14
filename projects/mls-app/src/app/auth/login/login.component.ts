import { Component } from '@angular/core';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { FirebaseUISignInFailure } from 'firebaseui-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  successCallback($event: FirebaseUISignInSuccessWithAuthResult) {
    // console.log('Login success -callback', $event);
  }
  errorCallback($event: FirebaseUISignInFailure) {
    // console.log('Login failed -callback', $event.code);
  }
  uiShownCallback() {
    // console.log('U is show -callback');
  }
}
