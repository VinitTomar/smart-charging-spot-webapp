import { TestBed, async, inject } from '@angular/core/testing';

import { DeActivateWhenLoggedInGuard } from './de-activate-when-logged-in.guard';

describe('DeActivateWhenLoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeActivateWhenLoggedInGuard]
    });
  });

  it('should ...', inject([DeActivateWhenLoggedInGuard], (guard: DeActivateWhenLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
