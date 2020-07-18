import { TestBed } from '@angular/core/testing';

import { JwtErrorHandlerService } from './jwt-error-handler.service';

describe('JwtErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JwtErrorHandlerService = TestBed.get(JwtErrorHandlerService);
    expect(service).toBeTruthy();
  });
});
