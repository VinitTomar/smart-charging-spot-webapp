import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AddBearerToken } from './add-bearer-token.service';
import { UserService } from '../services';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

class UserServiceStub {
  loggedIn = true;
  token = 'fake token';
}


fdescribe('AddBearerToken', () => {
  let httpClientMock: HttpClient;
  let httpMock: HttpTestingController;
  let userServiceStub: UserServiceStub;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      { provide: UserService, useClass: UserServiceStub },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AddBearerToken,
        multi: true
      }
    ]
  }));

  beforeEach(() => {
    httpClientMock = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    userServiceStub = TestBed.get(UserService);
  })

  it('should be created', () => {
    const service: AddBearerToken = TestBed.get(AddBearerToken);
    expect(service).toBeTruthy();
  });

  it('should add Authorization header, if user loggedIn', () => {
    userServiceStub.loggedIn = true;
    httpClientMock.get('dummy-url').subscribe(res => {
      expect(res).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne('dummy-url');
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
  });

  it('should not add Authorization header, if user is not loggedIn', () => {
    userServiceStub.loggedIn = false;
    httpClientMock.get('dummy-url').subscribe(res => {
      expect(res).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne('dummy-url');
    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
  });
});
