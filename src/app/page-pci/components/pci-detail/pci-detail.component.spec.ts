import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PciDetailComponent } from './pci-detail.component';

describe('PciDetailComponent', () => {
  let component: PciDetailComponent;
  let fixture: ComponentFixture<PciDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PciDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PciDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
