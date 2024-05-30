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

  logo: string = "/assets/logo2.png";

  isAuthenticated: Observable<boolean> | undefined;
  userName$: Observable<string | undefined> | null = null;
  userName: string | undefined ="";
  unreadMessagesCount = 0;
  constructor(private store: Store<AuthState>,private chatService: ChatService){}

  ngOnInit(): void {
      this.isAuthenticated = this.store.select(isAuthenticated);
      // this.chatService.unreadMessageCount$.subscribe((count) => {
      //   this.unreadMessagesCount = count;
      // });
      // this.userName$ = this.store.select(getuserName)
      // this.userName$.subscribe((user) => {
      //   console.log(user);
        
      //     this.userName = user;
      // })
      
      // this.userName$.subscribe((user)=>{
      //   if(user){
      //   this.userName = user 
      //   }
      // })
  }

  onLogout(event: Event){
    event.preventDefault();
    this.store.dispatch(logout())
  }


  // getInitial(userName: string):string{
  //   return userName? userName[0].toUpperCase(): "";

  // }

  // getInitial(userName: string | null | undefined): string {
  //   if (!userName) return ''; 
  //   console.log(userName);
  //   return userName[0]?.toUpperCase() || ''; 
  // }

  

}
