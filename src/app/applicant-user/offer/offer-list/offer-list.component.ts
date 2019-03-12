/*This page shows the list of available jobs to apply for. Can be accessed 
  from the welcome page and through the navbar */
import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../../../shared/services/job.service';
import { PaginationService } from '../../../shared/services/pagination.service';
import { Sort } from '@angular/material';
import { Subscription } from 'rxjs';
import { IJob } from 'src/app/shared/models/job.model';

/*
  This component consists of the list of jobs available (active)
  for applicants to apply. It contains searching/filtering and sorting 
  features.
*/
@Component({
  selector: 'offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit, OnDestroy 
{

  constructor
    (private router: Router,
    private jobService: JobService,
    private pagination: PaginationService) { }

  private jobSubscription: Subscription = new Subscription();
  private jobTotalSubscription: Subscription = new Subscription();


  searchActive: boolean = false;
  pageFilterActive: boolean = false;
  page: number = this.pagination.pageNumber;
  paginatorSize: number;
  totalJobs: number;
  paginatorCollectionSize: number;
  pageSize: number;

  searchBarInput: string;
  sortBy: string;

  availableJobs: IJob[];
  job: IJob;

  searchForm: FormGroup;
  search: FormControl;
  filter: FormControl;

  _listFilter: string;
  filteredJobs: IJob[];

  selectedFilter: string = 'All Jobs';

  selectedSort

  
  ngOnInit() {

    this.pageSize = this.pagination.pageSize;

    this.search = new FormControl();
    this.filter = new FormControl();

    this.searchForm = new FormGroup({
      search: this.search,
      filter: this.filter
    });

    // Get total amount of jobs to detemine pagination values.
    this.jobTotalSubscription.add(this.jobService.universalSearchCount('_',
    this.pagination.pageNumber, this.pagination.pageSize)
    .subscribe((data: number) => {
      this.totalJobs = data['Data'][0]
      this.pagination.setPageRange(this.totalJobs)
      this.paginatorSize = this.pagination.paginatorSize
      this.paginatorCollectionSize = this.pagination.paginatorSize * 10
    }));

    // Initialize jobs
  this.jobSubscription.add(this.jobService.universalSearch('_', this.pagination.pageNumber, this.pagination.pageSize)
    .subscribe((data: IJob[]) => {
      this.availableJobs = data['Data'];
      console.log(data['Message'])
      this.filteredJobs = this.availableJobs;
      this.sortedData = this.availableJobs.slice();
    }));

  }

  ngOnDestroy() {
    this.jobTotalSubscription.unsubscribe();
    this.jobSubscription.unsubscribe();
  }

  //event handler for the select element's change event
  selectDropdownChangeHandler(event: any) {
    //update the ui
    this.selectedFilter = event.target.value;
  }

  sortDropdownChangeHandler(event: any) {
    //update the ui
    this.selectedSort = event.target.value;
  }

  sortParamDropdownChangeHandler(event: any) {
    //update the ui
    this.sortBy = event.target.value;
  }

  universalSearch() {

    setTimeout(() => { this.refreshData()}, 200);
    setTimeout(() => { this.loadPage(1)}, 200);  
    
  }

  get listFilter(): string {
    return this._listFilter;

  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredJobs = this.listFilter ? this.performFilter(this.listFilter) : this.availableJobs;
  }

  performFilter(filterBy: string): IJob[] {
    filterBy = filterBy.toLocaleLowerCase();

    if (this.selectedFilter === 'Job Title')
      return this.availableJobs.filter((job: IJob) =>
        job.jobName.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Company')
      return this.availableJobs.filter((job: IJob) =>
        job.company.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Location/City')
      return this.availableJobs.filter((job: IJob) =>
        job.city.toLocaleLowerCase().indexOf(filterBy) !== -1)

    else if (this.selectedFilter === 'Location/Country')
      return this.availableJobs.filter((job: IJob) =>
        job.country.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Category')
      return this.availableJobs.filter((job: IJob) =>
        job.jobCategory.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Type')
      return this.availableJobs.filter((job: IJob) =>
        job.jobType.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Job Title')
      return this.availableJobs.filter((job: IJob) =>
        job.jobName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    else
      // return this.availableJobs
      // Universal search (if no filter selected default all jobs) 
      return this.availableJobs.filter((job: IJob) => {
        return job.company.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.city.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.jobName.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.jobType.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.country.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.jobCategory.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.company.toLocaleLowerCase().indexOf(filterBy) !== -1
      });
  }

  loadPage(page: number) {

    this.pagination.pageNumber = page

    if (this.searchBarInput === undefined) {
      this.jobService.universalSearch('_', page, this.pagination.pageSize)
        .subscribe((data: IJob[]) => {
          this.availableJobs = data['Data'];
          this.filteredJobs = this.availableJobs;
          this.sortedData = this.filteredJobs
        });
    }
    else {
      this.jobService.universalSearch(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJob[]) => {
          this.availableJobs = data['Data'];
          this.filteredJobs = this.availableJobs;
          this.sortedData = this.filteredJobs
        });
    }
  }
  
  refreshData() {

    if (this.searchBarInput === undefined || this.searchBarInput === '') {
      this.jobTotalSubscription.add(this.jobService.universalSearchCount('_',
      this.pagination.pageNumber, this.pagination.pageSize)
      .subscribe((data: number) => {
        this.totalJobs = data['Data'][0]
        this.pagination.setPageRange(this.totalJobs)
        this.paginatorSize = this.pagination.paginatorSize
        this.paginatorCollectionSize = this.pagination.paginatorSize * 10
      }));

    this.jobSubscription.add(this.jobService.universalSearch('_', this.pagination.pageNumber, this.pagination.pageSize)
      .subscribe((data: IJob[]) => {
        this.availableJobs = data['Data'];
        this.filteredJobs = this.availableJobs;
        this.sortedData = this.availableJobs.slice();
      }));
    }
    else
    {
      this.jobTotalSubscription.add(this.jobService.universalSearchCount(this.searchBarInput,
      this.pagination.pageNumber, this.pagination.pageSize)
      .subscribe((data: number) => {
        this.totalJobs = data['Data'][0]
        this.pagination.setPageRange(this.totalJobs)
        this.paginatorSize = this.pagination.paginatorSize
        this.paginatorCollectionSize = this.pagination.paginatorSize * 10
      }));

    this.jobSubscription.add(this.jobService.universalSearch(this.searchBarInput, this.pagination.pageNumber, this.pagination.pageSize)
      .subscribe((data: IJob[]) => {
        this.availableJobs = data['Data'];
        this.filteredJobs = this.availableJobs;
        this.sortedData = this.availableJobs.slice();
      }));
    }
  }

  /// Sorting
  sortedData: IJob[]

  sortData(sort: Sort) {

    const data = this.availableJobs.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'jobName': return compare(a.jobName, b.jobName, isAsc);
        case 'company': return compare(a.company, b.company, isAsc);
        case 'location': return compare(a.city, b.city, isAsc);
        case 'jobType': return compare(a.jobType, b.jobType, isAsc);
        case 'jobCategory': return compare(a.jobCategory, b.jobCategory, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



