import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  autoLogin,
  googleLogin,
  loginStart,
  loginSuccess,
  logout,
  updateUser,
  updateUsersuccess,
} from './auth.action';
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { MasterService } from '../../../core/services/master.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthState } from './auth.state';
import { Store } from '@ngrx/store';
import { AuthService } from '../service/auth-service.service';
import { setErrorMessage } from '../../../shared/store/shared.action';

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

  // login$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(loginStart),
  //     exhaustMap((action) => {
  //       return this.masterService.login(action.email, action.password).pipe(
  //         map((data) => {
  //           const role = data.user.role;
  //           this.authService.saveUserRoleInLocalStorage(role)
  //           if (data.user.role === 'USER') {
  //             this.tost.success(data.user.userName, 'loggedIn');
  //             this.router.navigateByUrl('user/home');
  //           }
  //           else {
  //             this.router.navigateByUrl('admin');
  //           }
  //           const user = this.authService.formatUser(data);
  //           this.authService.saveUserInLocalStorage(user);
  //           return loginSuccess({ user });
  //         }),
  //         catchError(()=>{
  //           return of(setErrorMessage({message: "Something went wrong! Incorrect Email or Password"}))
  //         })
  //       );
  //     })
  //   );
  // });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart, googleLogin),

      exhaustMap((action) => {
        if (action.type === loginStart.type) {
          return this.masterService.login(action.email, action.password).pipe(
            map((data) => {
              console.log(data, 'response data');
              const role = data.user.role;
              if (data.user.role === 'USER') {
                this.router.navigateByUrl('user/home');
              } else {
                this.router.navigateByUrl('admin');
              }
              const user = this.authService.formatUser(data);
              this.authService.saveUserInLocalStorage(user);
              return loginSuccess({ user });
            }),
            catchError(() => {
              return of(
                setErrorMessage({
                  message: 'Something went wrong! Incorrect Email or Password',
                })
              );
            })
          );
        } else {
          return this.masterService.googleLogin(action.token).pipe(
            map((data) => {
              const role = data.user.role;
              this.authService.saveUserRoleInLocalStorage(role);
              if (data.user.role === 'USER') {
                this.router.navigateByUrl('user/home');
              } else {
                this.router.navigateByUrl('admin');
              }
              const user = this.authService.formatUser(data);
              this.authService.saveUserInLocalStorage(user);
              return loginSuccess({ user });
            }),
            catchError(() => {
              return of(
                setErrorMessage({
                  message: 'Something went wrong! Incorrect Email or Password',
                })
              );
            })
          );
        }
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

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      exhaustMap((action) =>
        this.masterService.updateUser(action.user.id,action.user).pipe(
          map(res => updateUsersuccess({ user: res })),
        )
      )
    )
  );
}




// _updateUser = createEffect(() =>
//   this.action$.pipe(
//     ofType(updateUser),
//     exhaustMap((action) =>
//       this.service
//         .editUser(action.user.id, action.user)
//         .pipe(map((res) => updateUsersuccess({ user: action.user })
//         ))
//     )
//   )
// );
