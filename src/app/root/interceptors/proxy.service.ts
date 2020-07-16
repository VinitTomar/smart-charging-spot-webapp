import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProxyInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newUrl = 'http://localhost:3000/' + req.url;
    req.headers.set('Content-Type', 'application/json');
    const newReq: HttpRequest<any> = req.clone({
      url: newUrl
    })
    return next.handle(newReq);
  }
}