import { TestBed } from '@angular/core/testing';

import { AddBearerTokenService } from './add-bearer-token.service';

describe('AddBearerTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddBearerTokenService = TestBed.get(AddBearerTokenService);
    expect(service).toBeTruthy();
  });
});
