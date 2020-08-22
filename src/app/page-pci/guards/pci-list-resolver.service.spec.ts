import { TestBed } from '@angular/core/testing';

import { PciListResolverGuard } from './pci-list-resolver.guard';

describe('PciListResolverGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PciListResolverGuard = TestBed.get(PciListResolverGuard);
    expect(service).toBeTruthy();
  });
});
