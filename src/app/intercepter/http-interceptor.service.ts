import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { AuthService } from '../service/authService/auth-service.service';
import { LoaderService } from '../service/loadingService/loader.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

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

    // this.spinnerService.setLoading(true)
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
      )
      // finalize(()=>{
      //   this.spinnerService.setLoading(false);
      // })
    );
    throw new Error('Method not implemented.');
  }
}
