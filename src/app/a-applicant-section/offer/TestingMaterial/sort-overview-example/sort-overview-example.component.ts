import {Component, OnInit, ViewChild} from '@angular/core';
import {Sort, MatSort, MatTableDataSource} from '@angular/material';
import { JobService } from 'src/app/shared/services/job.service';
import { IJobOffer } from 'src/app/shared/models/job-offer.model';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IJob } from '../../../../shared/models/job.model';


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
  jobs


  loadPage(page: number) {

    if (this.searchBarInput === undefined) {
      this.jobService.universalSearch('_', page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.jobs = data['Data'];
          this.filteredJobs = this.availableJobs;
        })
    }
    else {
      this.jobService.universalSearch(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.jobs = data['Data'];
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
    this.jobs = data['Data'];
    this.filteredJobs = this.availableJobs;
    console.log(this.availableJobs)
  })

  this.pageSize =  this.pagination.pageSize


  }

    sortedData:IJobOffer[]

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
    // this.sortedData = this.jobs.slice();
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

