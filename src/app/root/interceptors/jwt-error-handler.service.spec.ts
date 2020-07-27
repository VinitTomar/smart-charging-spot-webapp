import { TestBed } from '@angular/core/testing';

import { JwtErrorHandlerService } from './jwt-error-handler.service';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../services';

class UserServiceStub {
  loggedIn = true;
  token = 'fake token';
}

describe('JwtErrorHandlerService', () => {
  let httpClientMock: HttpClient;
  let httpMock: HttpTestingController;
  let userServiceStub: UserServiceStub;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      { provide: UserService, useClass: UserServiceStub },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtErrorHandlerService,
        multi: true
      }
    ]
  }));

  beforeEach(() => {
    httpClientMock = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    userServiceStub = TestBed.get(UserService);
  });

  it('should be created', () => {
    const service: JwtErrorHandlerService = TestBed.get(JwtErrorHandlerService);
    expect(service).toBeTruthy();
  });
});
