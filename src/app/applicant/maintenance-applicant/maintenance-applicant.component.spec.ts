import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceApplicantComponent } from './maintenance-applicant.component';

describe('MaintenanceApplicantComponent', () => {
  let component: MaintenanceApplicantComponent;
  let fixture: ComponentFixture<MaintenanceApplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceApplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
