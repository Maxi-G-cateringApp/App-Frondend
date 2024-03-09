import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../auth/state/auth.state';
import { logout } from '../../../auth/state/auth.action';
import { isAuthenticated } from '../../../auth/state/auth.selector';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent implements OnInit{

  isAuthenticated: Observable<boolean> | undefined;
  constructor(private store: Store<AuthState>){}

  ngOnInit(): void {
      this.isAuthenticated = this.store.select(isAuthenticated);
  }

  onLogout(event: Event){
    event.preventDefault();
    this.store.dispatch(logout())
  }

}
