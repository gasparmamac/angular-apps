import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UiService } from '../../share/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate!: Date;
  isLoading = false;
  private isLoadingSubscription = new Subscription();

  constructor(private authService: AuthService, private uiService: UiService) {}

  ngOnDestroy(): void {
    if (this.isLoadingSubscription) this.isLoadingSubscription.unsubscribe;
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.isLoadingSubscription = this.uiService.isLoading.subscribe(
      (loadingState) => (this.isLoading = loadingState)
    );
  }
  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
