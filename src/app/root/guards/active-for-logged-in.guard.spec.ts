import { TestBed, async, inject } from '@angular/core/testing';

import { ActiveForLoggedInGuard } from './active-for-logged-in.guard';

describe('ActiveForLoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveForLoggedInGuard]
    });
  });

  it('should ...', inject([ActiveForLoggedInGuard], (guard: ActiveForLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
