import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
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
  constructor(private masterService: MasterService ,private store: Store<AppState>,private authService: AuthService) {}

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

    if(req.method === 'POST'){
    this.store.dispatch(setLoadingSpinner({status: true}));
    }

  
    return next.handle(apiRequest).pipe(
      tap(
        (event) => {
          if (event.type === HttpEventType.Response && event.status === 200) {
            const { token } = event.body;

            if (token) {
              this.authService.setTokenInLocalStorage(token);
              apiRequest.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
              });
            }
          }
        },
        catchError((error) => {
          if (error.status === 403) {
            console.log('unauthorized');
          }
          return throwError(error);
        })
      ),
      finalize(()=>{
        if(req.method === 'POST'){
        this.store.dispatch(setLoadingSpinner({status: false}))
        }

      })
    
    );
    throw new Error('Method not implemented.');
  }

  // private hasFileUploads(req: HttpRequest<any>): boolean {
  //   // Check if request body contains FormData or if it's a file upload
  //   return req.body instanceof FormData || (req.method === 'POST' && req.body && req.body.constructor.name === 'Object' && Object.values(req.body).some((value) => value instanceof File));
  // }
}