import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/root';
import { TokenResponse } from 'src/app/root/models/token-reponse';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private readonly _http: HttpClient) { }

  register(detail: User) {
    return this._http.post<TokenResponse>('signup', detail);
  }

}
