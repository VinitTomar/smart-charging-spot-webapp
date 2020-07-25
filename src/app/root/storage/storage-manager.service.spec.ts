import { TestBed } from '@angular/core/testing';

import { StorageManager } from './storage-manager.service';

describe('StorageManager', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageManager = TestBed.get(StorageManager);
    expect(service).toBeTruthy();
  });
});
