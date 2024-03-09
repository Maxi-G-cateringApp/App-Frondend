import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../service/loadingService/loader.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {

    private totalRequest = 0;
  constructor(private spinnerService: LoaderService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       console.log('cught')
       this.totalRequest++;
       this.spinnerService.setLoading(true)
       return next.handle(req).pipe(
        finalize(()=>{
            this.totalRequest--;
            if (this.totalRequest == 0) {
                this.spinnerService.setLoading(false);
              }
        })
       )

    }

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     this.spinnerService.showLoader();
//     return next.handle(req).pipe(
//       finalize(() => {
//         this.spinnerService.hideLoader();
//       })
//     );
//   }


}
