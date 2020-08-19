import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePciComponent } from './base-pci.component';

describe('BasePciComponent', () => {
  let component: BasePciComponent;
  let fixture: ComponentFixture<BasePciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasePciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
