import { TestBed, inject } from '@angular/core/testing';

import { HrApplicantProfileService } from '../hr-applicant-profile.service';

describe('HrApplicantProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrApplicantProfileService]
    });
  });

  it('should be created', inject([HrApplicantProfileService], (service: HrApplicantProfileService) => {
    expect(service).toBeTruthy();
  }));
});
