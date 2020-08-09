import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    service = TestBed.get(ProfileService);
    httpController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return token for user detail', () => {
    const detail: any = { username: 'dummy name' };

    service.update(detail).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const mockReq = httpController.expectOne({ method: 'Put' });

    mockReq.flush({ detail: 'dummy user' });

  })
});
