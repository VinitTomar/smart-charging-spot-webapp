import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../login.request';
import { LoginResponse } from '../login.response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  login(credential: LoginRequest) {
    return this._http.post<LoginResponse>('login', credential);
  }

}
