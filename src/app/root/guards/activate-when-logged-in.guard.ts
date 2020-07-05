import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { UserService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class ActivateWhenLoggedInGuard implements CanActivate, CanLoad {

  constructor(private _userService: UserService, private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean {
    if (this._userService.userLoggedIn) {
      return true;
    }

    return this._router.createUrlTree(['notfound'],
      {
        replaceUrl: false,
        skipLocationChange: true,
      }
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this._userService.userLoggedIn;
  }
}
