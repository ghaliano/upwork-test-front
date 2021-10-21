import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class DefaultJwtInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private toastr: NbToastrService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!req['headers'].get('Authorization')) {
      return next.handle(req);
    }
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this.injector.get(Router).navigate(['/auth/login']);
          } 
        }
        return throwError(err);
      }),
    );
  }
}
