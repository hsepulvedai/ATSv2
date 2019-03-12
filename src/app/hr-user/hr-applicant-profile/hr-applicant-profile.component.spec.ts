import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrApplicantProfileComponent } from './hr-applicant-profile.component';

describe('HrApplicantProfileComponent', () => {
  let component: HrApplicantProfileComponent;
  let fixture: ComponentFixture<HrApplicantProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrApplicantProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrApplicantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
