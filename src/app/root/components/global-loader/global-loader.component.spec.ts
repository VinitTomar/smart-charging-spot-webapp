import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalLoaderComponent } from './global-loader.component';
import { MatProgressBarModule } from '@angular/material';
import { GlobalLoaderService } from '../../services';


describe('GlobalLoaderComponent', () => {
  let component: GlobalLoaderComponent;
  let fixture: ComponentFixture<GlobalLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalLoaderComponent],
      imports: [MatProgressBarModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set show to true', () => {
    const service: GlobalLoaderService = TestBed.get(GlobalLoaderService);
    service.showLoader();
    expect(component.show).toBeTruthy();
  });

  it('should show loader', () => {
    const service: GlobalLoaderService = TestBed.get(GlobalLoaderService);
    service.showLoader();
    fixture.detectChanges();
    const elmClasses = fixture.debugElement.classes;
    let showClass = false;

    for (const cls in elmClasses) {
      if (cls === 'show' && elmClasses[cls])
        showClass = true;
    }

    expect(showClass).toBeTruthy();
  });

  it('should hide loader', () => {
    const service: GlobalLoaderService = TestBed.get(GlobalLoaderService);
    service.hideLoader();
    fixture.detectChanges();
    const elmClasses = fixture.debugElement.classes;
    let showClass = true;

    for (const cls in elmClasses) {
      if (cls === 'show' && !elmClasses[cls])
        showClass = false;
    }

    expect(showClass).toBeFalsy();
  });

  it('should set show to false', () => {
    const service: GlobalLoaderService = TestBed.get(GlobalLoaderService);
    service.hideLoader();
    expect(component.show).toBeFalsy();
  });
});
