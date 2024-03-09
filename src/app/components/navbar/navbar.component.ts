import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth/state/auth.state';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../../auth/state/auth.selector';
import { logout } from '../../auth/state/auth.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  logo: string = "/assets/logo2.png";

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
