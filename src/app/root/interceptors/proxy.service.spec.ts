import { TestBed } from '@angular/core/testing';

import { ProxyInterceptor } from './proxy.service';

describe('ProxyInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProxyInterceptor = TestBed.get(ProxyInterceptor);
    expect(service).toBeTruthy();
  });
});
