import { TestBed, inject } from '@angular/core/testing';

import { JobStatusService } from './job-status.service';

describe('JobStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobStatusService]
    });
  });

  it('should be created', inject([JobStatusService], (service: JobStatusService) => {
    expect(service).toBeTruthy();
  }));
});
