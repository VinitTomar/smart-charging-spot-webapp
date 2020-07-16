import { TestBed } from '@angular/core/testing';

import { AvailibiltyCheckerValidator } from './availability-checker';

describe('AvailibiltyCheckerValidator', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvailibiltyCheckerValidator = TestBed.get(AvailibiltyCheckerValidator);
    expect(service).toBeTruthy();
  });
});
