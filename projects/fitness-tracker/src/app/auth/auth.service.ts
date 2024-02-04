import { AuthData } from './auth-data.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  authState,
} from '@angular/fire/auth';
import { UiService } from '../share/ui.service';

@Injectable()
export class AuthService implements OnDestroy {
  authChange = new Subject<boolean>();
  isAuthenticated: boolean = false;

  private authStateSubscription = new Subscription();

  constructor(
    private router: Router,
    private afAuth: Auth,
    private uiService: UiService
  ) {}
  ngOnDestroy(): void {
    if (this.authStateSubscription) this.authStateSubscription.unsubscribe();
  }

  initAuthStateListener() {
    this.authStateSubscription = authState(this.afAuth).subscribe((user) => {
      if (user) {
        console.log('user from authstate', user);
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.isAuthenticated = false;
        this.authChange.next(false);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.isLoading.next(true);
    createUserWithEmailAndPassword(
      this.afAuth,
      authData.email,
      authData.password
    )
      .then((res) => {
        this.uiService.isLoading.next(false);
        console.log('User created successfully.', res);
      })
      .catch((error) => {
        this.uiService.isLoading.next(false);
        console.log('create user error', error);
        this.uiService.openSnackbar(error.message, '', 3000);
        // this.snackBar.open(error.message, '', { duration: 3000 });
      });
  }

  login(authData: AuthData) {
    // console.log('authDData', authData);
    this.uiService.isLoading.next(true);

    signInWithEmailAndPassword(this.afAuth, authData.email, authData.password)
      .then((res) => {
        this.uiService.isLoading.next(false);

        console.log('Logged in successfully.', res);
        this.isAuthenticated = true;
        this.authChange.next(true);
      })
      .catch((error) => {
        this.uiService.isLoading.next(false);
        console.log('login error', error);
        this.uiService.openSnackbar(error.message, '', 3000);
        // this.snackBar.open(error.message, '', { duration: 3000 });
      });
  }

  logout() {
    this.afAuth.signOut();
    this.isAuthenticated = false;
    this.authChange.next(false);
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
