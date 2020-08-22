import { TestBed } from '@angular/core/testing';

import { PciService } from './pci.service';

describe('PciService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PciService = TestBed.get(PciService);
    expect(service).toBeTruthy();
  });
});
