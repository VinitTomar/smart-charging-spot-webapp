import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class DeActivateWhenLoggedInGuard implements CanActivate, CanLoad {

  constructor(private _userService: UserService, private _router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    if (!this._userService.userLoggedIn) {
      return true;
    }

    return this._router.createUrlTree(['/']);
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean {
    return !this._userService.userLoggedIn;
  }
}
