import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalLoaderService {

  private _totalShowRequest = 0;

  private _loaderVisibiliytSubject = new BehaviorSubject<boolean>(false);
  get loaderVisibility$() {
    return this._loaderVisibiliytSubject.asObservable();
  }

  constructor() { }

  showLoader() {
    this._totalShowRequest++;
    if (this._totalShowRequest > 0) {
      this._loaderVisibiliytSubject.next(true);
    }
  }

  hideLoader() {
    this._totalShowRequest--;
    if (this._totalShowRequest < 1) {
      this._loaderVisibiliytSubject.next(false);
    }
  }
}
