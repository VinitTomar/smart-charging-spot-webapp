import { TestBed } from '@angular/core/testing';

import { BookingResolver } from './booking-resolver.guard';

describe('BookingResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookingResolver = TestBed.get(BookingResolver);
    expect(service).toBeTruthy();
  });
});
