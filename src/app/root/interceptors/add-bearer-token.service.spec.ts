import { TestBed } from '@angular/core/testing';

import { AddBearerToken } from './add-bearer-token.service';

describe('AddBearerToken', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddBearerToken = TestBed.get(AddBearerToken);
    expect(service).toBeTruthy();
  });
});