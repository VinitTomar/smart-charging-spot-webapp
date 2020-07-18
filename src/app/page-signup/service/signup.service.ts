import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupResponse } from '../signup.response';
import { SignupRequest } from '../signup.request';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private readonly _http: HttpClient) { }

  register(detail: SignupRequest) {
    return this._http.post<SignupResponse>('signup', detail);
  }

}
