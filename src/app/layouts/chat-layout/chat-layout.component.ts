import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from '../../pages/auth/state/auth.state';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '../../pages/auth/state/auth.selector';
import { logout } from '../../pages/auth/state/auth.action';

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.css'
})
export class ChatLayoutComponent {

  logo: string = "/assets/logo2.png";

  isAuthenticated: Observable<boolean> | undefined;
  userName$: Observable<string | undefined> | null = null;
  userName: string | undefined ="";
  constructor(private store: Store<AuthState>){}

  ngOnInit(): void {
      this.isAuthenticated = this.store.select(isAuthenticated);
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
