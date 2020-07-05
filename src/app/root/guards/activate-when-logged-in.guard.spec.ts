import { TestBed, async, inject } from '@angular/core/testing';

import { ActivateWhenLoggedInGuard } from './activate-when-logged-in.guard';

describe('ActivateWhenLoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivateWhenLoggedInGuard]
    });
  });

  it('should ...', inject([ActivateWhenLoggedInGuard], (guard: ActivateWhenLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
