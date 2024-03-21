import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../auth/state/auth.state';
import { logout } from '../../../auth/state/auth.action';
import { isAuthenticated } from '../../../auth/state/auth.selector';

@Component({
  selector: 'app-admin-menubar',
  templateUrl: './admin-menubar.component.html',
  styleUrl: './admin-menubar.component.css'
})
export class AdminMenubarComponent implements OnInit{

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
