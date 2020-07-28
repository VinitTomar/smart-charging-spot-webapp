import { TestBed, async, inject } from '@angular/core/testing';

import { ResolveIfLoggedInGuard } from './resolve-if-logged-in.guard';
import { UserService } from 'src/app/root/services';
import { of } from 'rxjs';

class UserServiceStub {
  fetchDetails(): any { }
}

fdescribe('ResolveIfLoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        ResolveIfLoggedInGuard
      ]
    });
  });

  it('should create', inject([ResolveIfLoggedInGuard], (guard: ResolveIfLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return observalbe of userDetail from resolve method ', inject([ResolveIfLoggedInGuard], (guard: ResolveIfLoggedInGuard) => {
    const dummyUserDetail = 'dummy user detail';
    const userSer: UserServiceStub = TestBed.get(UserService);

    spyOn(userSer, 'fetchDetails').and.returnValue(of(dummyUserDetail));

    const route: any = 'route';
    const state: any = 'state';

    guard.resolve(route, state).subscribe((detial: any) => {
      expect(detial).toBe(dummyUserDetail);
    })

  }));

});
