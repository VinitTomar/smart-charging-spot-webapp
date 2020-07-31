import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { AvailibiltyCheckerValidator } from './validators/availability-checker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [AvailibiltyCheckerValidator]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct error msg for username', () => {
    component.usernameFC.setErrors({ required: true });
    expect(component.usernameError).toBe('Username is required');

    component.usernameFC.setErrors({ pattern: true });
    expect(component.usernameError).toBe('Only alphanumeric, with underscore, allowed.');

    component.usernameFC.setErrors({ maxlength: true });
    expect(component.usernameError).toBe('Maximum 100 characters allowed');

    component.usernameFC.setErrors({ notAvailable: true });
    expect(component.usernameError).toBe('Username not available.');
  });


  it('should show correct error msg for fullname', () => {
    component.fullnameFC.setErrors({ required: true });
    expect(component.fullnameError).toBe('Fullname is required');

    component.fullnameFC.setErrors({ pattern: true });
    expect(component.fullnameError).toBe('Only alphabets, with space, allowed.');

    component.fullnameFC.setErrors({ maxlength: true });
    expect(component.fullnameError).toBe('Maximum 150 characters allowed');
  });

  it('should show correct error msg for email', () => {
    component.emailFC.setErrors({ required: true });
    expect(component.emailError).toBe('Email is required');

    component.emailFC.setErrors({ pattern: true });
    expect(component.emailError).toBe('Invalid email address.');

    component.emailFC.setErrors({ maxlength: true });
    expect(component.emailError).toBe('Maximum 250 characters allowed');

    component.emailFC.setErrors({ notAvailable: true });
    expect(component.emailError).toBe('Email not available.');
  });

  it('should show correct error msg for password', () => {
    component.passwordFC.setErrors({ required: true });
    expect(component.passwordError).toBe('Password is required');

    component.passwordFC.setErrors({ pattern: true });
    expect(component.passwordError).toBe('Invalid password address.');

    component.passwordFC.setErrors({ maxlength: true });
    expect(component.passwordError).toBe('Maximum 250 characters allowed');

    component.passwordFC.setErrors({ minlength: true });
    expect(component.passwordError).toBe('Minimum 3 characters reqired');
  });

});
