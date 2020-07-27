import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class JwtErrorHandlerService implements HttpInterceptor {

  constructor(
    private _usrSer: UserService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((errRes: HttpErrorResponse) => {
        const error = errRes.error;

        if (this._usrSer.loggedIn && errRes.status === 401) {
          this._usrSer.logout();
          return of(error);
        }

        return throwError(errRes);
      })
    );
  }
}
