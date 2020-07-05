import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageManager {

  get storage() {
    return localStorage;
  }

  constructor() { }
}
