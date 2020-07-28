import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

class RouterStub {
  navigateByUrl(url: string) { }
}

class HttpClientStub {
  get(url: string): any {
  }
}

describe('UserService', () => {
  let userServiceObj: UserService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useClass: HttpClientStub },
      { provide: Router, useClass: RouterStub }
    ]
  }));

  beforeEach(() => {
    userServiceObj = TestBed.get(UserService);
  })

  it('should be created', () => {
    expect(userServiceObj).toBeTruthy();
  });

  it('should return user as loggedIn, if token exist', () => {
    userServiceObj.token = 'dummy token';
    expect(userServiceObj.loggedIn).toBeTruthy();
  });

  it('should return user as loggedOut, if token does not exist', () => {
    userServiceObj.token = '';
    expect(userServiceObj.loggedIn).toBeFalsy();
  });

  it('should token as "dummy token"', () => {
    const token = 'dummy token';
    userServiceObj.token = token;
    expect(userServiceObj.token).toBe(token);
  });

  it('should set token if login method is called with token', () => {
    const token = 'dummy token';
    userServiceObj.login(token);
    expect(userServiceObj.token).toBe(token);
  });

  it('should navigate to profile page if logged in', () => {
    const router: RouterStub = TestBed.get(Router);
    const spyRouterNav = spyOn(router, 'navigateByUrl');
    userServiceObj.login('dummy token');
    expect(spyRouterNav).toHaveBeenCalledWith('profile');
  });

  it('should navigate to login page if logged out', () => {
    const router: RouterStub = TestBed.get(Router);
    const spyRouterNav = spyOn(router, 'navigateByUrl');
    userServiceObj.logout();
    expect(spyRouterNav).toHaveBeenCalledWith('login');
  });

  it('should clear token on logout', () => {
    userServiceObj.logout();
    expect(userServiceObj.token).toBeFalsy();
  });

  it('should call http get method if user detail not available', () => {
    userServiceObj.details = null;
    const httpClient: HttpClientStub = TestBed.get(HttpClient);
    const spyHttpGet = spyOn(httpClient, 'get').and.returnValue(of('some data'));
    userServiceObj.fetchDetails();
    expect(spyHttpGet).toHaveBeenCalledWith('profile');
  });

  it('should not call http get method if user detail is available', () => {
    userServiceObj.details = ({} as any);
    const httpClient: HttpClientStub = TestBed.get(HttpClient);
    const spyHttpGet = spyOn(httpClient, 'get').and.returnValue(of('some data'));
    userServiceObj.fetchDetails();
    expect(spyHttpGet).not.toHaveBeenCalled();
  });

  it('should return Observable of user detail, if user details available', () => {
    const dummyDetail = 'dummy user detail';
    userServiceObj.details = (dummyDetail as any);

    userServiceObj.fetchDetails().subscribe((detail: any) => {
      expect(detail).toBe(dummyDetail);
    })
  });

});
