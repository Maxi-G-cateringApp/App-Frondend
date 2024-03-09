import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './shared/app.state';
import { autoLogin } from './auth/state/auth.action';
import { getRole, isAuthenticated } from './auth/state/auth.selector';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'app-frondend';
  role!: string | undefined;
  // role$!: Observable<{role: string}>;
  isAuthenticated: Observable<boolean> | undefined;
  constructor(private store: Store<AppState>){}

  ngOnInit(): void {

    this.isAuthenticated = this.store.select(isAuthenticated);
      this.store.dispatch(autoLogin()); 
      this.store.select(getRole).subscribe((data)=>{
          this.role = data;
      })
      
      
      
      
  }
}
