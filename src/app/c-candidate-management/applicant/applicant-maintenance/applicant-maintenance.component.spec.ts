import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantMaintenanceComponent } from './applicant-maintenance.component';

describe('ApplicantMaintenanceComponent', () => {
  let component: ApplicantMaintenanceComponent;
  let fixture: ComponentFixture<ApplicantMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
