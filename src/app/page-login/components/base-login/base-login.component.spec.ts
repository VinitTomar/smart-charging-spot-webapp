import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLoginComponent } from './base-login.component';
import { LoginRoutingModule } from '../../login-routing.module';
import { MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/root/services';
import { LoginService } from '../../service/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

class LoginServiceStub {
  login() { }
}

class UserServiceStub {
  login() { }
}

describe('BaseLoginComponent', () => {
  let component: BaseLoginComponent;
  let fixture: ComponentFixture<BaseLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseLoginComponent],
      imports: [
        BrowserAnimationsModule,
        LoginRoutingModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        { provide: LoginService, useClass: LoginServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.form).toBeTruthy();
  });

  it('should call service login method', () => {
    component.usernameFC.setValue('vinit');
    component.passwordFC.setValue('tomar');
    const loginService: LoginService = TestBed.get(LoginService);
    const loginSerSpy = spyOn(loginService, 'login').and.returnValue(of({ token: 'fake token' }));

    component.submit();
    expect(loginSerSpy).toHaveBeenCalled();
  });

  it('should set submittionInProgress to false', () => {
    component.usernameFC.setValue('vinit');
    component.passwordFC.setValue('tomar');
    const loginService: LoginService = TestBed.get(LoginService);
    spyOn(loginService, 'login').and.returnValue(throwError('server error'));

    component.submit();
    expect(component.submittionInProgress).toBeFalsy();
  });

  it('should set submittionInProgress to true', () => {
    component.usernameFC.setValue('vinit');
    component.passwordFC.setValue('tomar');
    const loginService: LoginService = TestBed.get(LoginService);
    spyOn(loginService, 'login').and.returnValue(of({ token: 'fake token' }));

    component.submit();
    expect(component.submittionInProgress).toBeTruthy();
  });

  it('should call submit on login button click', () => {
    const debugElm = fixture.debugElement.query(By.css('#loginBtn'));
    const spySubmit = spyOn(component, 'submit');

    debugElm.triggerEventHandler('click', null);
    expect(spySubmit).toHaveBeenCalled();
  });

  it('should disable login button on login button click', () => {
    component.usernameFC.setValue('vinit');
    component.passwordFC.setValue('tomar');

    const loginService: LoginService = TestBed.get(LoginService);
    spyOn(loginService, 'login').and.returnValue(of({ token: 'fake token' }));

    const debugElm = fixture.debugElement.query(By.css('#loginBtn'));
    const btnHtmlelement: HTMLElement = debugElm.nativeElement;

    debugElm.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(btnHtmlelement.hasAttribute('disabled')).toBeTruthy();
  });

  it(`should set "required" error on usernameFC`, () => {
    component.usernameFC.markAsTouched();
    expect(component.usernameErr).toContain('Enter username');
  });

  it(`should display "required" username error in html`, () => {
    component.usernameFC.markAsTouched();
    fixture.detectChanges();
    const htmlElm: HTMLElement = fixture.debugElement.query(By.css('#username-error')).nativeElement;
    expect(htmlElm.innerHTML).toContain('Enter username');
  });

  it(`should set "Account does not exist" error on usernameFC`, () => {
    component.usernameFC.setValue('vinit');
    component.passwordFC.setValue('tomar');
    const loginService: LoginService = TestBed.get(LoginService);
    const errRes = {
      status: 401,
      error: {
        field: 'username',
        message: 'Account does not exist'
      }
    };

    spyOn(loginService, 'login').and.returnValue(throwError(errRes));

    component.submit();
    fixture.detectChanges();
    expect(component.usernameErr).toEqual('Account does not exist');
  });

  it(`should display "Account does not exist" error in html`, () => {
    component.usernameFC.setValue('vinit');
    component.passwordFC.setValue('tomar');
    const loginService: LoginService = TestBed.get(LoginService);
    const errRes = {
      status: 401,
      error: {
        field: 'username',
        message: 'Account does not exist'
      }
    };

    spyOn(loginService, 'login').and.returnValue(throwError(errRes));

    component.submit();
    component.usernameFC.markAllAsTouched();
    fixture.detectChanges();
    const htmlElm: HTMLElement = fixture.debugElement.query(By.css('#username-error')).nativeElement;
    expect(htmlElm.innerHTML).toContain('Account does not exist');
  });

  it(`should set "required" error on passwordFC`, () => {
    component.passwordFC.markAsTouched();
    expect(component.passwordErr).toContain('Enter password');
  });

  it(`should display "required" password error in html`, () => {
    component.passwordFC.markAsTouched();
    fixture.detectChanges();
    const htmlElm: HTMLElement = fixture.debugElement.query(By.css('#password-error')).nativeElement;
    expect(htmlElm.innerHTML).toContain('Enter password');
  });

  it(`should set "Invalid password" error on passwordFC`, () => {
    component.usernameFC.setValue('vinit');
    component.passwordFC.setValue('tomar');
    const loginService: LoginService = TestBed.get(LoginService);
    const errRes = {
      status: 401,
      error: {
        field: 'password',
        message: 'Invalid password'
      }
    };

    spyOn(loginService, 'login').and.returnValue(throwError(errRes));

    component.submit();
    fixture.detectChanges();
    expect(component.passwordErr).toEqual('Invalid password');
  });

  it(`should display "Invalid password" password error in html`, () => {
    component.usernameFC.setValue('vinit');
    component.passwordFC.setValue('tomar');
    const loginService: LoginService = TestBed.get(LoginService);
    const errRes = {
      status: 401,
      error: {
        field: 'password',
        message: 'Invalid password'
      }
    };

    spyOn(loginService, 'login').and.returnValue(throwError(errRes));

    component.submit();
    component.passwordFC.markAllAsTouched();
    fixture.detectChanges();
    const htmlElm: HTMLElement = fixture.debugElement.query(By.css('#password-error')).nativeElement;
    expect(htmlElm.innerHTML).toContain('Invalid password');
  });

});
