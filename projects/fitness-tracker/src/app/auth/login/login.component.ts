import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, min } from 'rxjs';
import { AuthService } from '../auth.service';
import { UiService } from '../../share/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading = false;
  private isLoadingSubscription = new Subscription();

  constructor(private authService: AuthService, private uiService: UiService) {}
  ngOnDestroy(): void {
    if (this.isLoadingSubscription) this.isLoadingSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });

    this.isLoadingSubscription = this.uiService.isLoading.subscribe(
      (loadingState) => (this.isLoading = loadingState)
    );
  }
  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }
}
