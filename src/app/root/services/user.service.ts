import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { StorageManager } from '../storage';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly tokenKey = 'token';

  private get _storage() {
    return this._storageManager.storage;
  }

  details: User = null;

  get loggedIn() {
    return !!this._storage.getItem(this.tokenKey);
  }

  get token() {
    return this._storage.getItem(this.tokenKey);
  }
  set token(tkn: string) {
    this._storage.setItem(this.tokenKey, tkn);
  }

  constructor(
    private _storageManager: StorageManager,
    private _router: Router,
    private _http: HttpClient
  ) { }

  fetchDetails() {
    if (this.details) {
      return of(this.details);
    }

    return this._http.get<User>('profile')
      .pipe(tap((detail: User) => { this.details = detail; }));
  }

  login(token: string) {
    this.token = token;
    this._router.navigateByUrl('profile');
  }

  logout() {
    this._storage.clear();
    this._router.navigateByUrl('login');
  }

}
