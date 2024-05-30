import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from '../../../auth/state/auth.state';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { isAuthenticated } from '../../../auth/state/auth.selector';
import { logout } from '../../../auth/state/auth.action';

@Component({
  selector: 'app-employee-menu-bar',
  templateUrl: './employee-menu-bar.component.html',
  styleUrl: './employee-menu-bar.component.css'
})
export class EmployeeMenuBarComponent {
  isAuthenticated: Observable<boolean> | undefined;
  constructor(private store: Store<AuthState>,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(logout());
  }
}
