import { TestBed } from '@angular/core/testing';

import { GlobalLoaderService } from './global-loader.service';

describe('GlobalLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalLoaderService = TestBed.get(GlobalLoaderService);
    expect(service).toBeTruthy();
  });

  it('should remain loaderVisibility$ to true', () => {
    const service: GlobalLoaderService = TestBed.get(GlobalLoaderService);
    service.showLoader();
    service.showLoader();
    service.hideLoader();

    service.loaderVisibility$.subscribe(visible => {
      expect(visible).toBeTruthy();
    })
  });

  it('should remain loaderVisibility$ to false', () => {
    const service: GlobalLoaderService = TestBed.get(GlobalLoaderService);
    service.showLoader();
    service.showLoader();
    service.hideLoader();
    service.hideLoader();

    service.loaderVisibility$.subscribe(visible => {
      expect(visible).toBeFalsy();
    })
  });
});
