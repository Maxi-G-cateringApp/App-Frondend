// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
// } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, finalize } from 'rxjs';
// import { LoaderService } from '../service/loader.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class HttpInterceptorService implements HttpInterceptor {
//   constructor(private spinnerService: LoaderService) {}

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
// }
