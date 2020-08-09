import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GlobalLoaderService } from '../services';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ProxyInterceptor implements HttpInterceptor {

  constructor(
    private _loader: GlobalLoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loader.showLoader();
    const newUrl = 'http://localhost:3000/' + req.url;
    const newReq: HttpRequest<any> = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      },
      url: newUrl
    });

    return next.handle(newReq).pipe(
      finalize(() => this._loader.hideLoader())
    );
  }
}