import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSignupComponent } from './base-signup.component';

describe('BaseSignupComponent', () => {
  let component: BaseSignupComponent;
  let fixture: ComponentFixture<BaseSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
