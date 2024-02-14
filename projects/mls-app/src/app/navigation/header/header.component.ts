import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  user$ = this.authService.user$;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  onClick() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.authService.signOut();
  }
  onLogin() {}
}
