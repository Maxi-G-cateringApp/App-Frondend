import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { Store } from '@ngrx/store';
import { AppState } from './shared/app.state';
import { autoLogin } from './auth/state/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'app-frondend';

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
      this.store.dispatch(autoLogin())
  }
}
