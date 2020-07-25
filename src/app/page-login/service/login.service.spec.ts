import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoginResponse } from '../login.response';

class FakeHttpClient {
  post(): Observable<LoginResponse> {
    return of({ token: 'fake token' });
  }
}

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useClass: FakeHttpClient }
    ]
  }));

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });

  it('should call login api', () => {
    const service: LoginService = TestBed.get(LoginService);
    const httpClient: HttpClient = TestBed.get(HttpClient);
    const spyHttp = spyOn(httpClient, 'post');

    service.login({ password: 'pass', username: 'user' });
    expect(spyHttp).toHaveBeenCalled();
  });

  it('should not call login api', () => {
    const httpClient: HttpClient = TestBed.get(HttpClient);
    const spyHttp = spyOn(httpClient, 'post');

    expect(spyHttp).not.toHaveBeenCalled();
  });

  it('should return token', () => {
    const service: LoginService = TestBed.get(LoginService);
    service.login({ password: 'pass', username: 'user' }).subscribe(tokenRes => {
      expect(tokenRes.token).toEqual('fake token');
    });
  });
});
