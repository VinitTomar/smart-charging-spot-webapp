import { TestBed } from '@angular/core/testing';

import { ProxyInterceptor } from './proxy.service';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { GlobalLoaderService } from '../services';

describe('ProxyInterceptor', () => {
  let httpClientMock: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ProxyInterceptor,
        multi: true
      }
    ]
  }));

  beforeEach(() => {
    httpClientMock = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: ProxyInterceptor = TestBed.get(ProxyInterceptor);
    expect(service).toBeTruthy();
  });
});
