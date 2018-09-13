import {Component, OnInit, ViewChild} from '@angular/core';
import {Sort, MatSort, MatTableDataSource} from '@angular/material';
import { JobService } from 'src/app/shared/services/job.service';
import { IJobOffer } from 'src/app/shared/models/job-offer.model';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


export interface Job {
  jobName: string;
  company: string;
  city: string;
  country: string;
  jobType:string;
  jobCategory:string;
}

@Component({
  selector: 'app-sort-overview-example',
  templateUrl: './sort-overview-example.component.html',
  styleUrls: ['./sort-overview-example.component.css']
})



export class SortOverviewExampleComponent implements OnInit{

  searchButtonClicked: boolean = false
  page: number = this.pagination.pageNumber;
  paginatorSize: number
  totalJobs: number
  paginatorCollectionSize:number
  pageSize:number

  searchBarInput: string
  sortBy: string

  availableJobs: IJobOffer[]
  job: IJobOffer

  searchForm: FormGroup
  search: FormControl
  filter: FormControl

  _listFilter: string;
  filteredJobs: IJobOffer[]

  selectedFilter: string = 'All Jobs';

  selectedSort

  
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

    if (this.searchBarInput != undefined) {

      this.jobService.universalSearchCount(this.searchBarInput, 
      this.pagination.pageNumber, this.pagination.pageSize)
      .subscribe((data: number) => {
        this.totalJobs = data['Data'][0]
        this.pagination.setPageRange(this.totalJobs)
        this.paginatorSize = this.pagination.paginatorSize
        this.paginatorCollectionSize = this.pagination.paginatorSize * 10
      })

      this.jobService.universalSearch(this.searchBarInput, this.pagination.pageNumber,
        this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.availableJobs = data['Data'];
          this.filteredJobs = this.availableJobs;
        })
    }
  }
  
  get listFilter(): string {
    return this._listFilter;

  }

  set listFilter(value: string) {

    this._listFilter = value;
    this.filteredJobs = this.listFilter ? this.performFilter(this.listFilter) : this.availableJobs;
  }


  performFilter(filterBy: string): IJobOffer[] {
    filterBy = filterBy.toLocaleLowerCase();


    if (this.selectedFilter === 'Job Title')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.jobName.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Company')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.company.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Location/City')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.city.toLocaleLowerCase().indexOf(filterBy) !== -1)

    else if (this.selectedFilter === 'Location/Country')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.country.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Category')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.jobCategory.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Type')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.jobType.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Job Title')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.jobName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    else
      // return this.availableJobs
      // Universal search (if no filter selected default all jobs) 
      return this.availableJobs.filter((job: IJobOffer) => {
        return job.company.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.city.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.jobName.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.jobType.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.country.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.jobCategory.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.company.toLocaleLowerCase().indexOf(filterBy) !== -1
      })
  }

  loadPage(page: number) {

    if (this.searchBarInput === undefined) {
      this.jobService.universalSearch('_', page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.availableJobs = data['Data'];
          this.filteredJobs = this.availableJobs;
        })
    }
    else {
      this.jobService.universalSearch(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.availableJobs = data['Data'];
          this.filteredJobs = this.availableJobs;
        })
    }
  }



  ngOnInit() {

    
    this.jobService.universalSearchCount('_', 
    this.pagination.pageNumber, this.pagination.pageSize)
    .subscribe((data: number) => {
      this.totalJobs = data['Data'][0]
      this.pagination.setPageRange(this.totalJobs)
      this.paginatorSize = this.pagination.paginatorSize
      this.paginatorCollectionSize = this.pagination.paginatorSize * 10
    })

this.jobService.universalSearch('_', this.pagination.pageNumber, this.pagination.pageSize)
  .subscribe((data: IJobOffer[]) => {
    this.availableJobs = data['Data'];
    this.filteredJobs = this.availableJobs;
  })

  this.pageSize =  this.pagination.pageSize

this.search = new FormControl();
this.filter = new FormControl();


this.searchForm = new FormGroup({
  search: this.search,
  filter: this.filter
})


  }

  jobs: Job[] =  [
    {
        jobName: 'Accountant',
        company: 'Apple',
        city: 'San Francisco',
        country: 'United States',
        jobCategory: 'Finance',
        jobType: 'Full-time'
    },
    {
        jobName: 'Accountant',
        company: 'Guitar Center',
        city: 'Los Angeles',
        country: 'United States',
        jobCategory: 'Finance',
        jobType: 'Full-time'
    },
    {
        jobName: 'Assistant Manager',
        company: 'Guitar Center',
        city: 'Los Angeles',
        country: 'United States',
        jobCategory:'Customer Service',
        jobType: 'Part-time'
    },
    {
      "jobName": "Sales - test",
      "company": "Guitar Center",
      "city": "Los Angeles",
      "country": "United States",
      "jobCategory": "Customer Service",
      "jobType": "Part-time"
  },
  {
      "jobName": "Sales Asistent",
      "company": "Guitar Center",
      "city": "Los Angeles",
      "country": "United States",
      "jobCategory": "Customer Service",
      "jobType": "Part-time"
  },];

    sortedData: Job[]

  sortData(sort: Sort) {
    const data = this.jobs.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'jobName': return compare(a.jobName, b.jobName, isAsc);
        case 'company': return compare(a.company, b.company, isAsc);
        case 'city': return compare(a.city, b.city, isAsc);
        case 'jobType': return compare(a.jobType, b.jobType, isAsc);
        case 'jobCategory': return compare(a.jobCategory, b.jobCategory, isAsc);
        default: return 0;
      }
    });
  }

  constructor(private router: Router,
    private jobService: JobService,
    //private route: ActivatedRoute,
    private pagination: PaginationService) {
    this.sortedData = this.jobs.slice();
   
  }

  
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

