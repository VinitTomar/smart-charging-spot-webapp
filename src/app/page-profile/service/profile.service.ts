import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/root';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private _http: HttpClient
  ) { }

  update(updated: User) {
    return this._http.put<User>('profile', updated);
  }

}
