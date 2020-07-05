import { Injectable } from '@angular/core';
import { User } from 'src/app/root/models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageManager {
  private readonly tokenKey = 'token';
  private readonly userDetailKey = 'userDetails';

  get storage() {
    return localStorage;
  }

  get token() {
    return this.storage.getItem(this.tokenKey);
  }

  set token(tkn: string) {
    this.storage.setItem(this.tokenKey, tkn);
  }

  get userDetail(): User {
    const detail: User = JSON.parse(this.storage.getItem(this.userDetailKey));
    return detail;
  }

  set userDetail(detail: User) {
    this.storage.setItem(this.userDetailKey, JSON.stringify(detail));
  }

  constructor() { }
}
