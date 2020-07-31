import { TestBed } from '@angular/core/testing';

import { SignupService } from './signup.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SignupService', () => {
  let service: SignupService;
  let httpController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    service = TestBed.get(SignupService);
    httpController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return token for user detail', () => {
    const detail: any = { username: 'dummy name' };

    service.register(detail).subscribe(res => {
      expect(res.token).toBe('dummy token');
    });

    const mockReq = httpController.expectOne({ method: 'Post' });

    mockReq.flush({ token: 'dummy token' });

  })

});
