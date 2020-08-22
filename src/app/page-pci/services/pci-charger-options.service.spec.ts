import { TestBed } from '@angular/core/testing';

import { PciChargerOptionsService } from './pci-charger-options.service';

describe('PciChargerOptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PciChargerOptionsService = TestBed.get(PciChargerOptionsService);
    expect(service).toBeTruthy();
  });
});
