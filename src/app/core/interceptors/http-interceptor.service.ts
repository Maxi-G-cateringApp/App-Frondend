import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { MasterService } from '../services/master.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/app.state';
import { setLoadingSpinner } from '../../shared/store/shared.action';
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
    const BASE_URL = 'http://localhost:8080';

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

    if (req.method === 'POST') {
      this.store.dispatch(setLoadingSpinner({ status: true }));
    }

    return next.handle(apiRequest).pipe(
      catchError((error) => {
        if (error.status === 403) {
          console.log('unauthorized');
        }
        return throwError(error); 
      }),
      tap({
        next: (event) => {
          if (event instanceof HttpResponse && event.status === 200) {
            const { token, refreshToken } = event.body;
    
            if (token) {
              console.log(token, 'interceptor');
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
        if (req.method === 'POST') {
          this.store.dispatch(setLoadingSpinner({ status: false }));
        }
      })
    );  
}
}
