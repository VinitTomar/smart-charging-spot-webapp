import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { User, UserService } from 'src/app/root';

@Injectable()
export class ResolveIfLoggedInGuard implements Resolve<User> {

  constructor(
    private _usrSer: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this._usrSer.fetchDetails();
  }

}
