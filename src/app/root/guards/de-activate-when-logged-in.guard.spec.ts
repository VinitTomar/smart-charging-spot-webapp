import { TestBed, async, inject } from '@angular/core/testing';

import { DeActivateWhenLoggedInGuard } from './de-activate-when-logged-in.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services';
import { Router } from '@angular/router';

class UserServiceStub {
  loggedIn = true;
}

describe('DeActivateWhenLoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        DeActivateWhenLoggedInGuard
      ]
    });
  });

  it('should create', inject([DeActivateWhenLoggedInGuard], (guard: DeActivateWhenLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));


  it('should return true if user is not logged in, from canActiate', inject([DeActivateWhenLoggedInGuard, UserService],
    (guard: DeActivateWhenLoggedInGuard, usrSer: UserService) => {
      (usrSer as UserServiceStub).loggedIn = false;

      const next: any = 'next';
      const state: any = 'state';

      expect(guard.canActivate(next, state)).toBe(true);
    }
  ));

  it('should return UrlTree Object if user is not logged in, from canActiate', inject([DeActivateWhenLoggedInGuard, UserService],
    (
      guard: DeActivateWhenLoggedInGuard,
      usrSer: UserService
    ) => {
      (usrSer as UserServiceStub).loggedIn = true;
      const router = TestBed.get(Router);

      const next: any = 'next';
      const state: any = 'state';

      const urlTree = router.createUrlTree(['/'],
        {
          replaceUrl: false,
          skipLocationChange: true,
        }
      );

      expect(guard.canActivate(next, state)).toEqual(urlTree);
    }
  ));


  it('should return true from canLoad, if user not loggedIn', inject([DeActivateWhenLoggedInGuard, UserService],
    (
      guard: DeActivateWhenLoggedInGuard,
      usrSer: UserService
    ) => {
      (usrSer as UserServiceStub).loggedIn = false;

      const route: any = 'route';
      const segment: any = 'segment';

      expect(guard.canLoad(route, segment)).toBeTruthy();
    }
  ));

  it('should return false from canLoad, if user loggedIn', inject([DeActivateWhenLoggedInGuard, UserService],
    (
      guard: DeActivateWhenLoggedInGuard,
      usrSer: UserService
    ) => {
      (usrSer as UserServiceStub).loggedIn = true;

      const route: any = 'route';
      const segment: any = 'segment';

      expect(guard.canLoad(route, segment)).toBeFalsy();
    }
  ));

});
