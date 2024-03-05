import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { autoLogin, loginStart, loginSuccess, logout } from './auth.action';
import { exhaustMap, map, mergeMap, of } from 'rxjs';
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';
import { AuthenticatedUser } from '../../model/authUser.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.username, action.password).pipe(
          map((data) => {
            if(data.user.role === 'USER'){
            this.router.navigateByUrl('auth/user_home');
            }else{
              this.router.navigateByUrl('auth/admin_home');
            }
            const user = this.authService.formatUser(data);
            this.authService.saveUserInLocalStorage(user);
            return loginSuccess({ user });
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
  }
  );

  logout$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(logout),
      map((action) => {
        this.authService.logout()
      })
    )
  },
  {dispatch: false})
}
