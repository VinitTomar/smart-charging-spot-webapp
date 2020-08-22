import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPciComponent } from './add-edit-pci.component';

describe('AddEditPciComponent', () => {
  let component: AddEditPciComponent;
  let fixture: ComponentFixture<AddEditPciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditPciComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
