import { TestBed } from '@angular/core/testing';

import { StorageManager } from './storage-manager.service';

fdescribe('StorageManager', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageManager = TestBed.get(StorageManager);
    expect(service).toBeTruthy();
  });

  it('should return localstoreage', () => {
    const service: StorageManager = TestBed.get(StorageManager);
    expect(service.storage).toBeTruthy();
  });
});
