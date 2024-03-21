import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './shared/app.state';
import { autoLogin } from './pages/auth/state/auth.action';
import { getRole, isAuthenticated } from './pages/auth/state/auth.selector';
import { Observable } from 'rxjs';
import { getLoading } from './shared/store/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  title = 'app-frondend';
  role: string | undefined;
  showLoading!: Observable<boolean | undefined>;
  isAuthenticated: Observable<boolean> | undefined;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.store.dispatch(autoLogin());
    this.store.select(getRole).subscribe((data) => {
      this.role = data;
    });
  }
}
