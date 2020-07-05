import { TestBed } from '@angular/core/testing';

import { ServerErrorHandlerService } from './server-error-handler.service';

describe('ServerErrorHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerErrorHandlerService = TestBed.get(ServerErrorHandlerService);
    expect(service).toBeTruthy();
  });
});
