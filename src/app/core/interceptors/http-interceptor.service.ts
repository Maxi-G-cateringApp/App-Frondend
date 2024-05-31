import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/app.state';
import { setErrorMessage, setLoadingSpinner } from '../../shared/store/shared.action';
import { AuthService } from '../../pages/auth/service/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const BASE_URL = 'https://api.maxigcatering.online';

    let apiRequest = req.clone({
      url: BASE_URL + req.url,
    });
    let accToken = this.authService.getTokenFromLocalStorage();

    if (accToken) {
      
      apiRequest = apiRequest.clone({
        setHeaders: {
          authorization: `Bearer ${accToken}`,
        },
      });
    }

    if (req.method === 'POST' || req.method === 'DELETE') {
      this.store.dispatch(setLoadingSpinner({ status: true }));
    }

    return next.handle(apiRequest).pipe(
      catchError((error) => {
        if (error.status === 403) {
          this.store.dispatch(setErrorMessage({message:"Something Went Wrong"}))
        }
        if (error.status === 409) {
          this.store.dispatch(setErrorMessage({message:"Data already present"}))
        }
        return throwError(error); 
      }),
      tap({
        next: (event) => {
          if (event instanceof HttpResponse && event.status === 200) {
            const { token, refreshToken } = event.body;
    
            if (token) {
              this.authService.setTokenInLocalStorage(token);
              apiRequest = apiRequest.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
              });
            }
            if (refreshToken) {
              this.authService.setRefreshTokenInLocalStorage(refreshToken);
            }
          }
        },
      }),
      finalize(() => {
        if (req.method === 'POST' || req.method === 'DELETE') {
          this.store.dispatch(setLoadingSpinner({ status: false }));
        }
      })
    );  
}
}
