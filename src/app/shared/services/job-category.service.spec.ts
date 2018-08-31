import { TestBed, inject } from '@angular/core/testing';

import { JobCategoryService } from './job-category.service';

describe('JobCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobCategoryService]
    });
  });

  it('should be created', inject([JobCategoryService], (service: JobCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
