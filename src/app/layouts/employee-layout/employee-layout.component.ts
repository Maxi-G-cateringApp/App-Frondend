import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../pages/auth/state/auth.state';
import { isAuthenticated } from '../../pages/auth/state/auth.selector';
import { logout } from '../../pages/auth/state/auth.action';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-layout',
  templateUrl: './employee-layout.component.html',
  styleUrl: './employee-layout.component.css'
})
export class EmployeeLayoutComponent {

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
