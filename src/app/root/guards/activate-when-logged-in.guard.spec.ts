import { TestBed, async, inject } from '@angular/core/testing';

import { ActivateWhenLoggedInGuard } from './activate-when-logged-in.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services';
import { Router } from '@angular/router';

class UserServiceStub {
  loggedIn = true;
}

describe('ActivateWhenLoggedInGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        ActivateWhenLoggedInGuard
      ]
    });
  });

  it('should create', inject([ActivateWhenLoggedInGuard], (guard: ActivateWhenLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return true if user is logged in, from canActiate', inject([ActivateWhenLoggedInGuard, UserService],
    (guard: ActivateWhenLoggedInGuard, usrSer: UserService) => {
      (usrSer as UserServiceStub).loggedIn = true;

      const next: any = 'next';
      const state: any = 'state';

      expect(guard.canActivate(next, state)).toBe(true);
    }
  ));

  it('should return UrlTree Object if user is not logged in, from canActiate', inject([ActivateWhenLoggedInGuard, UserService],
    (
      guard: ActivateWhenLoggedInGuard,
      usrSer: UserService
    ) => {
      (usrSer as UserServiceStub).loggedIn = false;
      const router = TestBed.get(Router);

      const next: any = 'next';
      const state: any = 'state';

      const urlTree = router.createUrlTree(['notfound'],
        {
          replaceUrl: false,
          skipLocationChange: true,
        }
      );

      expect(guard.canActivate(next, state)).toEqual(urlTree);
    }
  ));


  it('should return true from canLoad, if user loggedIn', inject([ActivateWhenLoggedInGuard, UserService],
    (
      guard: ActivateWhenLoggedInGuard,
      usrSer: UserService
    ) => {
      (usrSer as UserServiceStub).loggedIn = true;

      const route: any = 'route';
      const segment: any = 'segment';

      expect(guard.canLoad(route, segment)).toBeTruthy();
    }
  ));

  it('should return false from canLoad, if user not loggedIn', inject([ActivateWhenLoggedInGuard, UserService],
    (
      guard: ActivateWhenLoggedInGuard,
      usrSer: UserService
    ) => {
      (usrSer as UserServiceStub).loggedIn = false;

      const route: any = 'route';
      const segment: any = 'segment';

      expect(guard.canLoad(route, segment)).toBeFalsy();
    }
  ));
});
