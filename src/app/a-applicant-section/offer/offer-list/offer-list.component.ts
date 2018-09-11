import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from '../../../shared/services/job.service';
import { IJobOffer } from '../../../shared/models/job-offer.model';
import { PaginationService } from '../../../shared/services/pagination.service';
import { $ } from 'protractor';

@Component({
  selector: 'offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {

  constructor
    (private router: Router,
    private jobService: JobService,
    //private route: ActivatedRoute,
    private pagination: PaginationService) { }

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


  performSort() {

    // if (this.selectedSort === 'Job Title' && this.sortBy === 'Sort A-Z') {
    //   this.jobService.sortByJobTitleAsc()
    //   .subscribe((data: IJobOffer[]) => {
    //     this.availableJobs = data['Data'];
    //     this.filteredJobs = this.availableJobs;
    //   })
    //   if(this._listFilter != null)
    //   this.performFilter(this._listFilter);
    // }
    // else if (this.selectedSort === 'Job Title' && this.sortBy === 'Sort Z-A') {
    //   this.jobService.sortByJobTitleDesc()
    //   .subscribe((data: IJobOffer[]) => {
    //     this.availableJobs = data['Data'];
    //     this.filteredJobs = this.availableJobs;
    //   })
    //   if(this._listFilter != null)
    //   this.performFilter(this._listFilter);
    // }
    // else if (this.selectedSort === 'Company' && this.sortBy === 'Sort A-Z') {
    //   this.jobService.sortByCompanyAsc()
    //   .subscribe((data: IJobOffer[]) => {
    //     this.availableJobs = data['Data'];
    //     this.filteredJobs = this.availableJobs;
    //   })
    // }
    // else if (this.selectedSort === 'Company' && this.sortBy === 'Sort Z-A') {
    //   this.jobService.sortByCompanyDesc()
    //   .subscribe((data: IJobOffer[]) => {
    //     this.availableJobs = data['Data'];
    //     this.filteredJobs = this.availableJobs;
    //   })
    // }

    // else if (this.selectedSort === 'Location/City' && this.sortBy === 'Sort A-Z') {
    //   this.jobService.sortByJobLocationCityAsc()
    //   .subscribe((data: IJobOffer[]) => {
    //     this.availableJobs = data['Data'];
    //     this.filteredJobs = this.availableJobs;
    //   })
    // }
    // else if (this.selectedSort === 'Location/City' && this.sortBy === 'Sort Z-A') {
    //   this.jobService.sortByJobLocationCityDesc()
    //   .subscribe((data: IJobOffer[]) => {
    //     this.availableJobs = data['Data'];
    //     this.filteredJobs = this.availableJobs;
    //   })
    // }

    // else if (this.selectedSort === 'Location/Country' && this.sortBy === 'Sort A-Z') {
    //   this.jobService.sortByJobLocationCountryAsc()
    //   .subscribe((data: IJobOffer[]) => {
    //     this.availableJobs = data['Data'];
    //     this.filteredJobs = this.availableJobs;
    //   })
    // }
    // else if (this.selectedSort === 'Location/Country' && this.sortBy === 'Sort Z-A') {
    //   this.jobService.sortByJobLocationCountryDesc()
    //   .subscribe((data: IJobOffer[]) => {
    //     this.availableJobs = data['Data'];
    //     this.filteredJobs = this.availableJobs;
    //   })
    // }
    // else if (this.selectedSort === 'Category' && this.sortBy === 'Sort A-Z') {
    //   this.jobService.sortByJobCateogoryAsc()
    //   .subscribe((data: IJobOffer[]) => {
    //     this.availableJobs = data['Data'];
    //     this.filteredJobs = this.availableJobs;
    //   })
    // }
    // else if (this.selectedSort === 'Category' && this.sortBy === 'Sort Z-A') {
    //   this.jobService.sortByJobCateogoryDesc()
    //   .subscribe((data: IJobOffer[]) => {
    //     this.availableJobs = data['Data'];
    //     this.filteredJobs = this.availableJobs;
    //   })
    // }

    // else if (this.selectedSort === 'Type' && this.sortBy === 'Sort A-Z') {
    //   this.jobService.sortByJobTypeAsc()
    //   .subscribe((data: IJobOffer[]) => {
    //     this.availableJobs = data['Data'];
    //     this.filteredJobs = this.availableJobs;
    //   })
    // }
    // else if (this.selectedSort === 'Type' && this.sortBy === 'Sort Z-A') {
    //   this.jobService.sortByJobTypeDesc()
    //   .subscribe((data: IJobOffer[]) => {
    //     this.availableJobs = data['Data'];
    //     this.filteredJobs = this.availableJobs;
    //   })
    // }
    // else ;

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

    // $(document).ready(function () {
    //   $('#dtBasicExample').DataTable();
    //   $('.dataTables_length').addClass('bs-select');
    // });
  
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

  applyButtonClicked(jobId: number) {

    this.jobService.currentJobId = jobId;
    this.router.navigate(['offer-application'])

  }

}