import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseRegisterPciComponent } from './base-register-pci.component';

describe('BaseRegisterPciComponent', () => {
  let component: BaseRegisterPciComponent;
  let fixture: ComponentFixture<BaseRegisterPciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseRegisterPciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseRegisterPciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
