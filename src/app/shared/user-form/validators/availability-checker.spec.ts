import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AvailibiltyCheckerValidator } from './availability-checker';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('AvailibiltyCheckerValidator', () => {
  let service: AvailibiltyCheckerValidator;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [AvailibiltyCheckerValidator]
  }));

  beforeEach(() => {
    service = TestBed.get(AvailibiltyCheckerValidator);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return null, if email is available', fakeAsync(() => {
    const absController: any = { value: 'dummyemail' };
    const validator = service.checkEmailAvailability();

    validator(absController).subscribe(res => {
      expect(res).toBeNull();
    });

    tick(800);
    const httpMocReq = httpMock.expectOne({ method: 'get' });
    httpMocReq.flush({ available: true });
  }));

  it('should return validation error, if email is not available', fakeAsync(() => {
    const absController: any = { value: 'dummyemail' };
    const validator = service.checkEmailAvailability();

    validator(absController).subscribe(res => {
      expect(res.notAvailable).toBe(absController.value);
    });

    tick(800);
    const httpMocReq = httpMock.expectOne({ method: 'get' });
    httpMocReq.flush({ available: false });
  }));

  it('should be return null, if username is available', fakeAsync(() => {
    const absController: any = { value: 'dummyusername' };
    const validator = service.checkUsernameAvailability();

    validator(absController).subscribe(res => {
      expect(res).toBeNull();
    });

    tick(800);
    const httpMocReq = httpMock.expectOne({ method: 'get' });
    httpMocReq.flush({ available: true });
  }));

  it('should return validation error, if username is not available', fakeAsync(() => {
    const absController: any = { value: 'dummyusername' };
    const validator = service.checkUsernameAvailability();

    validator(absController).subscribe(res => {
      expect(res.notAvailable).toBe(absController.value);
    });

    tick(800);
    const httpMocReq = httpMock.expectOne({ method: 'get' });
    httpMocReq.flush({ available: false });
  }));
});
