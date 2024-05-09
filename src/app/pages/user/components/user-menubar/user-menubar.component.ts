import { Component, OnInit, computed, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '../../../auth/state/auth.selector';
import { Observable } from 'rxjs';
import { logout } from '../../../auth/state/auth.action';
import { AppState } from '../../../../shared/app.state';
import { MenuItem } from '../../models/menu-item.model';



@Component({
  selector: 'app-user-menubar',
  templateUrl: './user-menubar.component.html',
  styleUrl: './user-menubar.component.css'
})
export class UserMenubarComponent implements OnInit{

  isAuthenticated: Observable<boolean> | undefined;
 
  logo: string = "/assets/logo2.png";
  constructor(private store: Store<AppState>){}
  collapsed = signal(true);

  sideNavWidth = computed(()=>this.collapsed() ? '65px': '250px');

  menuItem = signal<MenuItem[]>([
    {label: 'Home',route:''}, {label: 'Login',route:'/auth'}, {label: 'Signup',route:'/auth/register'}
  ]);



  ngOnInit(): void {

    this.isAuthenticated = this.store.select(isAuthenticated);

      
  }


  onLogout(event: Event){
    event.preventDefault();
    this.store.dispatch(logout())
  }

}
