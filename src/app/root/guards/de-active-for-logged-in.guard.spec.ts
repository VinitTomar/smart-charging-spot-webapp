import { TestBed, async, inject } from '@angular/core/testing';

import { DeActiveForLoggedInGuard } from './de-active-for-logged-in.guard';

describe('DeActiveForLoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeActiveForLoggedInGuard]
    });
  });

  it('should ...', inject([DeActiveForLoggedInGuard], (guard: DeActiveForLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
