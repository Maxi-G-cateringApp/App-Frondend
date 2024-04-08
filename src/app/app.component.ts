import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './shared/app.state';
import { autoLogin } from './pages/auth/state/auth.action';
import { getRole, isAuthenticated } from './pages/auth/state/auth.selector';
import { Observable } from 'rxjs';
import { getErrorMessage, getLoading } from './shared/store/shared.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from './core/services/master.service';

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
  showErrorMessage!: Observable<string>;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private masterService: MasterService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // this.route.queryParams.subscribe((params) => { 
    //   if (params['code'] !== undefined) {
    //     this.masterService.getToken(params['code']).subscribe((result) => {
    //       if (result === true) {
    //         this.router.navigateByUrl('/user/home');
    //       } else {
    //         this.router.navigateByUrl('/user/home');
    //       }
    //     });
    //   }
    // });

    this.showLoading = this.store.select(getLoading);
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.showErrorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
    this.store.select(getRole).subscribe((data) => {
      this.role = data;
    });
  }

  
}
