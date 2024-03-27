import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { autoLogin, loginStart, loginSuccess, logout } from './auth.action';
import { exhaustMap, map, mergeMap, of } from 'rxjs';
import { MasterService } from '../../../core/services/master.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthState } from './auth.state';
import { Store } from '@ngrx/store';
import { AuthService } from '../service/auth-service.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private masterService: MasterService,
    private authService: AuthService,
    private router: Router,
    private tost: ToastrService,
    private store: Store<AuthState>
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.masterService.login(action.username, action.password).pipe(
          map((data) => {
            console.log(data)
            if (data.user.role === 'USER') {
              this.tost.success(data.user.username, 'loggedIn');
              this.router.navigateByUrl('user');
            } else {
              this.router.navigateByUrl('admin');
            }
            const user = this.authService.formatUser(data);
            this.authService.saveUserInLocalStorage(user);
            return loginSuccess({user});
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
        return of(loginSuccess({ user }));
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        map((action) => {
          this.authService.logout();
          this.router.navigateByUrl('/auth');
        })
      );
    },
    { dispatch: false }
  );
}
