import { TestBed, async, inject } from '@angular/core/testing';

import { ResolveIfLoggedInGuard } from './resolve-if-logged-in.guard';

describe('ResolveIfLoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveIfLoggedInGuard]
    });
  });

  it('should ...', inject([ResolveIfLoggedInGuard], (guard: ResolveIfLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
