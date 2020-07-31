import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSignupComponent } from './base-signup.component';
import { UserService } from 'src/app/root/services';
import { SignupService } from '../../service/signup.service';
import { UserFormModule } from 'src/app/shared/user-form';
import { MatCardModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

class SignupServiceStub {
  register(val: any): any { }
}

class UserServiceStub {
  login() { }
}

class HttpClientStub {
  get() { }
  post() { }
}

fdescribe('BaseSignupComponent', () => {
  let component: BaseSignupComponent;
  let fixture: ComponentFixture<BaseSignupComponent>;
  let userService: UserServiceStub;
  let signupService: SignupServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseSignupComponent],
      imports: [
        NoopAnimationsModule,
        UserFormModule,
        MatCardModule
      ],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        { provide: SignupService, useClass: SignupServiceStub },
        { provide: HttpClient, userClass: HttpClientStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = TestBed.get(UserService);
    signupService = TestBed.get(SignupService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call register, if form is not valid', () => {
    const spyRegister = spyOn(signupService, 'register');
    component.register()
    expect(spyRegister).not.toHaveBeenCalled();
  });

  it('should call register, if form is valid.', () => {
    Object.keys(component.form.controls).forEach(key => {
      component.form.controls[key].clearValidators();
      component.form.controls[key].clearAsyncValidators();
    });

    component.form.setValue({
      'username': 'dummy',
      'email': 'dummy',
      'fullname': 'dummy',
      'password': 'dummy'
    });

    component.form.updateValueAndValidity();
    const spyRegister = spyOn(signupService, 'register')
      .and.returnValue(of({ token: 'dummy token' }));

    component.register();
    expect(spyRegister).toHaveBeenCalled();
  });

  it('should login if token is returned.', () => {
    Object.keys(component.form.controls).forEach(key => {
      component.form.controls[key].clearValidators();
      component.form.controls[key].clearAsyncValidators();
    });

    component.form.setValue({
      'username': 'dummy',
      'email': 'dummy',
      'fullname': 'dummy',
      'password': 'dummy'
    });
    const spyLogin = spyOn(userService, 'login');
    component.form.updateValueAndValidity();
    spyOn(signupService, 'register').and.returnValue(of({ token: 'dummy token' }));
    component.register();
    expect(spyLogin).toHaveBeenCalled();
  });


  it('should not login if error is returned.', () => {
    Object.keys(component.form.controls).forEach(key => {
      component.form.controls[key].clearValidators();
      component.form.controls[key].clearAsyncValidators();
    });

    component.form.setValue({
      'username': 'dummy',
      'email': 'dummy',
      'fullname': 'dummy',
      'password': 'dummy'
    });
    const spyLogin = spyOn(userService, 'login');
    component.form.updateValueAndValidity();
    spyOn(signupService, 'register').and.returnValue(throwError('error'));
    component.register();
    expect(spyLogin).not.toHaveBeenCalled();
  });

});
