import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent {
  @Output() closeSidenav = new EventEmitter<void>();
  user$ = this.authService.user$;

  constructor(private authService: AuthService) {}

  onClick() {
    this.closeSidenav.emit();
  }
  onLogout() {
    this.closeSidenav.emit();
    this.authService.signOut();
  }
}
