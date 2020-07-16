import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, first, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvailibiltyCheckerValidator {

  constructor(
    private _http: HttpClient
  ) { }

  private _checkAvailability(apiCall: (val: string) => Observable<Object>) {
    const checker = new ReplaySubject<string>(0);
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;
      checker.next(control.value);

      return checker.asObservable().pipe(
        distinctUntilChanged(),
        debounceTime(700),
        switchMap(val => {
          return apiCall(val);
        }),
        map<any, ValidationErrors | null>((res: any) => {
          if (res.available)
            return null;

          return { notAvailable: value }
        }),
        first()
      );
    }

  }

  checkUsernameAvailability() {
    return this._checkAvailability((username: string) => {
      return this._http.get('available/username', { params: { value: username } });
    });
  }

  checkEmailAvailability() {
    return this._checkAvailability((email: string) => {
      return this._http.get('available/email', { params: { value: email } });
    });
  }
}
