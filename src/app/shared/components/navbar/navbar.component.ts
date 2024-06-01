import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../pages/auth/state/auth.state';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../../../pages/auth/state/auth.selector';
import { logout } from '../../../pages/auth/state/auth.action';
import { ChatService } from '../../../core/services/chat.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isMenuOpen = false;
  logo: string = "/assets/logo2.png";

  isAuthenticated: Observable<boolean> | undefined;
  userName$: Observable<string | undefined> | null = null;
  userName: string | undefined ="";
  unreadMessagesCount = 0;
  constructor(private store: Store<AuthState>,private chatService: ChatService){}

  ngOnInit(): void {
      this.isAuthenticated = this.store.select(isAuthenticated);
  
  }

  onLogout(event: Event){
    event.preventDefault();
    this.store.dispatch(logout())
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
