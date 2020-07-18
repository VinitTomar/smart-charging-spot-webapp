import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { UserService } from '../services';

@Injectable({
  providedIn: "root"
})
export class AddBearerToken implements HttpInterceptor {

  constructor(
    private _usrSer: UserService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._usrSer.loggedIn) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${this._usrSer.token}`
        },
      });
    }

    return next.handle(req);
  }
}
