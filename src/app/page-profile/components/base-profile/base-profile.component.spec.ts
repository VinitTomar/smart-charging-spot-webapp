import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BaseProfileComponent } from './base-profile.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserFormModule, UserFormComponent } from 'src/app/shared/user-form';
import { MatCardModule, MatDividerModule, MatListModule, MatIconModule } from '@angular/material';
import { UserService } from 'src/app/root/services';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../service/profile.service';
import { User } from 'src/app/root/models';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';

class ProfileServiceStub {
  update(val: User): any { }
}

class UserServiceStub {
  details: User = {
    email: 'dummy email',
    fullname: 'dummy fullname',
    username: 'dummy username'
  };
}

class HttpClientStub {
  get() { }
  post() { }
}

fdescribe('BaseProfileComponent', () => {
  let component: BaseProfileComponent;
  let fixture: ComponentFixture<BaseProfileComponent>;
  let userService: UserServiceStub;
  let profileService: ProfileServiceStub;
  let httpClient: HttpClientStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseProfileComponent],
      imports: [
        NoopAnimationsModule,
        UserFormModule,
        MatCardModule,
        MatDividerModule,
        MatListModule,
        MatIconModule
      ],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        { provide: ProfileService, useClass: ProfileServiceStub },
        { provide: HttpClient, userClass: HttpClientStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    userService = TestBed.get(UserService);
    profileService = TestBed.get(ProfileService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should return correct', () => {
    let profile: User;

    beforeEach(() => {
      profile = component.profile;
    });

    it('username', () => {
      expect(component.username).toBe(profile.username);
    });

    it('email', () => {
      expect(component.email).toBe(profile.email);
    });

    it('fullname', () => {
      expect(component.fullname).toBe(profile.fullname);
    });

  });

  it('should set edit to true', () => {
    component.editDetails();
    fixture.detectChanges();
    expect(component.edit).toBe(true);
  })

  it('should set edit to false', () => {
    component.cancel();
    expect(component.edit).toBe(false);
  });

  describe('form testing', () => {
    let formComponent: UserFormComponent;
    let profile: User;

    beforeEach(fakeAsync(() => {
      component.editDetails();
      fixture.detectChanges();
      tick(0)
      formComponent = component.userFormComponent;
      profile = component.profile;
    }));

    it('form username control should have value as profile detail', fakeAsync(() => {
      expect(formComponent.usernameFC.value).toBe(profile.username);
    }));

    it('form email control should have value as profile detail', fakeAsync(() => {
      expect(formComponent.emailFC.value).toBe(profile.email);
    }));

    it('form fullname control should have value as profile detail', fakeAsync(() => {
      expect(formComponent.fullnameFC.value).toBe(profile.fullname);
    }));

    it('form password control should have be empty', fakeAsync(() => {
      expect(formComponent.passwordFC.value).toBe('');
    }));

    it('should disable emailFC & usernameFc', fakeAsync(() => {
      expect(formComponent.usernameFC.disabled).toBe(true);
      expect(formComponent.emailFC.disabled).toBe(true);
    }));

    it('should not call update on service, if form is invalid', fakeAsync(() => {
      const spyUpdate = spyOn(profileService, 'update');
      component.update();
      expect(spyUpdate).not.toHaveBeenCalled();
    }));

    it('should call update on service, if form is valid', fakeAsync(() => {
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

      const spyUpdate = spyOn(profileService, 'update').and.returnValue(of({ detal: 'dummy detail' }));
      component.update();
      expect(spyUpdate).toHaveBeenCalled();
    }));

  });

});
