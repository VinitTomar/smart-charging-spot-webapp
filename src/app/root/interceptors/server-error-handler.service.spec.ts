import { TestBed } from '@angular/core/testing';

import { ServerErrorHandler } from './server-error-handler.service';

describe('ServerErrorHandler', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerErrorHandler = TestBed.get(ServerErrorHandler);
    expect(service).toBeTruthy();
  });
});
