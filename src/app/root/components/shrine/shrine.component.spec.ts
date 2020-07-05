import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShrineComponent } from './shrine.component';

describe('ShrineComponent', () => {
  let component: ShrineComponent;
  let fixture: ComponentFixture<ShrineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShrineComponent ]
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
});
