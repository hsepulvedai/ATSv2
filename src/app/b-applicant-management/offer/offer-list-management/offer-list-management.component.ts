import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { JobService } from '../../../shared/services/job.service';
import { IJobOfferHR } from '../../../shared/models/job-offer-hr.model';
import { IJobOffer } from '../../../shared/models/job-offer.model';
import { ApplicationService } from '../../../shared/services/application.service'
import { PaginationService } from '../../../shared/services/pagination.service';
import { Sort } from '@angular/material';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-offer-list-management',
  templateUrl: './offer-list-management.component.html',
  // styleUrls: ['./offer-list-management.component.css']
})
export class OfferListManagementComponent implements OnInit {

  private jobSubscription: Subscription = new Subscription();
  private jobTotalSubscription: Subscription = new Subscription();

  jobs: IJobOfferHR[]
  job: IJobOfferHR
  totalJobs: number
  counts: number[]
  applicationCount: number[]
  jobId: number
  index = 0;

  searchBarInput: string
  pageSize: number
  paginatorSize: number
  paginatorCollectionSize: number
  page: number = this.pagination.pageNumber;

  constructor(private router: Router, private jobService: JobService, private applicantionService: ApplicationService
    , private pagination: PaginationService) { }

  ngOnInit() {

    this.pageSize = this.pagination.pageSize
    this.paginatorSize = this.pagination.paginatorSize

    setTimeout(() => { this.refreshData()}, 100);

  }

  loadPage(page: number) {

    this.pagination.pageNumber = page

    if (this.searchBarInput === undefined) {
      this.jobService.universalSearchJobShowHR('_', page, this.pagination.pageSize)
        .subscribe((data: IJobOfferHR[]) => {
          this.jobs = data['Data'];
          this.sortedData = this.jobs
        })
    }
    else {
      this.jobService.universalSearchJobShowHR(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJobOfferHR[]) => {
          this.jobs = data['Data'];
          this.sortedData = this.jobs
        })
    }
  }

  goToOfferDetail(job) {
    this.jobService.currentJob = job
    console.log(this.jobService.currentJob)

    this.router.navigate(['hr-offer-detail'])
  }

  getCounts(id) {

    this.applicantionService.getCount(id)
      .subscribe((data) => {
        this.applicationCount = data['Data'];
        console.log(this.applicationCount)
      })

    return this.applicationCount
  }

  universalSearch() {

    setTimeout(() => { this.refreshData()}, 200);
    setTimeout(() => { this.loadPage(1)}, 200);
    
  }

  refreshData() {

    if (this.searchBarInput === undefined || this.searchBarInput === '') {
      this.jobTotalSubscription.add(this.jobService.universalSearchJobShowHRCount
        ('_', this.pagination.pageNumber, this.pageSize)
        .subscribe((data: number) => {
          this.totalJobs = data['Data'][0]
          this.pagination.setPageRange(this.totalJobs)
          this.paginatorCollectionSize = this.pagination.getCollectionSize()
        }))
      this.jobSubscription.add(this.jobService.universalSearchJobShowHR('_', this.pagination.pageNumber, this.pageSize)
        .subscribe((data: IJobOfferHR[]) => {
          this.jobs = data['Data'];
          this.sortedData = this.jobs.slice();
        }))
    }
    else {
      this.jobTotalSubscription.add(this.jobService.universalSearchJobShowHRCount
        (this.searchBarInput, this.pagination.pageNumber, this.pageSize)
        .subscribe((data: number) => {
          this.totalJobs = data['Data'][0]
          this.pagination.setPageRange(this.totalJobs)
          this.paginatorCollectionSize = this.pagination.getCollectionSize()
        }))

      this.jobSubscription.add(this.jobService.universalSearchJobShowHR(this.searchBarInput, this.pagination.pageNumber, this.pageSize)
        .subscribe((data: IJobOfferHR[]) => {
          this.jobs = data['Data'];
          this.sortedData = this.jobs.slice();
        }))
    }
  }

  /// Sorting
  sortedData: IJobOfferHR[]

  sortData(sort: Sort) {

    const data = this.jobs.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;

      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'jobId': return compare(a.jobId, b.jobId, isAsc);
        case 'jobName': return compare(a.jobName, b.jobName, isAsc);
        case 'jobApplicants': return compare(a.numberofApplicants, b.numberofApplicants, isAsc);
        case 'jobStatus': return compare(a.jobStatus, b.jobStatus, isAsc);
        case 'jobType': return compare(a.jobType, b.jobType, isAsc);
        case 'jobCategory': return compare(a.jobCategory, b.jobCategory, isAsc);
        case 'jobPostedStatus': return compare('Posted', 'Not Posted', isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
