import { Injectable } from '@angular/core';

import { StorageManager } from '../storage/storage-manager.service';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly tokenKey = 'token';
  private readonly userDetailKey = 'userDetails';

  private get _storage() {
    return this._storageManager.storage;
  }

  get userLoggedIn() {
    return !!this._storage.getItem(this.token) &&
      !!this._storage.getItem(this.userDetailKey);
  }

  get token() {
    return this._storage.getItem(this.tokenKey);
  }
  set token(tkn: string) {
    this._storage.setItem(this.tokenKey, tkn);
  }

  get userDetail(): User {
    const detail: User = JSON.parse(this._storage.getItem(this.userDetailKey));
    return detail;
  }
  set userDetail(detail: User) {
    this._storage.setItem(this.userDetailKey, JSON.stringify(detail));
  }

  constructor(private _storageManager: StorageManager) { }

  loginUser(user: User, token: string) {
    this.token = token;
    this.userDetail = user;
  }

  logoutUser() {
    this._storage.clear();
  }

  updateUserDetail(detail: User) {
    this.userDetail = detail;
  }
}
