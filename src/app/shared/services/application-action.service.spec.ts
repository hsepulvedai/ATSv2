import { TestBed, inject } from '@angular/core/testing';

import { ApplicationActionService } from './application-action.service';

describe('ApplicationActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationActionService]
    });
  });

  it('should be created', inject([ApplicationActionService], (service: ApplicationActionService) => {
    expect(service).toBeTruthy();
  }));
});
