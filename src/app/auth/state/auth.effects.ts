import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess } from './auth.action';
import { exhaustMap,map } from 'rxjs';
import { AuthService } from '../../service/auth-service.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService,private router: Router) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.username, action.password).pipe(
          map((data) => {
            this.router.navigateByUrl("/user_home")
            const user = data;
            return loginSuccess({user});
          })
        );
      })
    );
  });
}
