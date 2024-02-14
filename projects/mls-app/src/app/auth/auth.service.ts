import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { FirebaseuiAngularLibraryService } from 'firebaseui-angular';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  authStateSubscription = new Subscription();
  isAuthenticated: boolean = false;

  user$ = this.afAuth.user;
  // idToken$ = this.afAuth.idToken;
  // authState$ = this.afAuth.authState;

  constructor(
    private afAuth: AngularFireAuth,
    private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }

  firebaseAuthChangeListener() {
    this.afAuth.authState.subscribe((aUser) => {
      if (aUser) {
        this.isAuthenticated = true;
        this.router.navigate(['dashboard']);
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  disableAutoSignIn = () => {
    this.firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
  };

  signOut = () => {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  };
}
