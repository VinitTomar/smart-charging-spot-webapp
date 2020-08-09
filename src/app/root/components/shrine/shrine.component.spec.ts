import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShrineComponent } from './shrine.component';
import { UserService, GlobalLoaderService } from '../../services';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { GlobalLoaderComponent } from '../global-loader/global-loader.component';
import { MatToolbarModule, MatProgressBarModule } from '@angular/material';
import { RouterTestingModule } from "@angular/router/testing";
import { By } from '@angular/platform-browser';


class UserServiceStub {
  loggedIn = true;
  logout() { }
}

describe('ShrineComponent', () => {
  let component: ShrineComponent;
  let fixture: ComponentFixture<ShrineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShrineComponent,
        GlobalLoaderComponent,
      ],
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatProgressBarModule
      ],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShrineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showLoader', () => {
    const router = TestBed.get(Router);

    const spyShowLoader = spyOn(TestBed.get(GlobalLoaderService), 'showLoader');
    router.events.next(new NavigationStart(1, '/'));

    expect(spyShowLoader).toHaveBeenCalled();
  });

  it('should call hideLoader', () => {
    const router = TestBed.get(Router);

    const spyHideLoader = spyOn(TestBed.get(GlobalLoaderService), 'hideLoader');
    router.events.next(new NavigationEnd(1, '/', '/'));

    expect(spyHideLoader).toHaveBeenCalled();
  });

  it('should call user service logout if logout button clicked', () => {
    const usrSer: UserServiceStub = TestBed.get(UserService);
    usrSer.loggedIn = true;
    fixture.detectChanges();
    const spyUsrLogout = spyOn(usrSer, 'logout');
    const logoutbtnElm = fixture.debugElement.query(By.css('#logout-btn'));

    logoutbtnElm.triggerEventHandler('click', null);

    expect(spyUsrLogout).toHaveBeenCalled();
  });

  it('should have "login & singup" link if user is not loggedIn', () => {
    const usrSer: UserServiceStub = TestBed.get(UserService);
    usrSer.loggedIn = false;
    fixture.detectChanges();

    const loginBtnElm = fixture.debugElement.query(By.css('#login-btn')).nativeElement;
    const signupBtnElm = fixture.debugElement.query(By.css('#signup-btn')).nativeElement;

    const hasBothBtns = !!loginBtnElm && !!signupBtnElm;

    expect(hasBothBtns).toBeTruthy();
  });

  it('should have "home & profile" link if user is loggedIn', () => {
    const usrSer: UserServiceStub = TestBed.get(UserService);
    usrSer.loggedIn = true;
    fixture.detectChanges();

    const homeBtnElm = fixture.debugElement.query(By.css('#home-btn')).nativeElement;
    const profileBtnElm = fixture.debugElement.query(By.css('#profile-btn')).nativeElement;

    const hasBothBtns = !!homeBtnElm && !!profileBtnElm;

    expect(hasBothBtns).toBeTruthy();
  });



});
