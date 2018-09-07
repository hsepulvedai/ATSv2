import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from '../../../shared/services/job.service';
import { IJobOffer } from '../../../shared/models/job-offer.model';
@Component({
  selector: 'app-view-available-jobs',
  templateUrl: './offer-list.component.html',
  //styleUrls: ['./view-available-jobs.component.css']
})
export class OfferListComponent implements OnInit {

  searchBarInput: string

  availableJobs: IJobOffer[]
  job: IJobOffer

  searchForm: FormGroup
  search: FormControl
  filter: FormControl

  _listFilter: string;
  filteredJobs: IJobOffer[]

  selectedFilter: string = 'All Jobs';

  selectedSort
  sortBy


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

    if (this.sortBy === 'Sort A-Z') {
      this.jobService.universalSearchSortAsc(this.searchBarInput, 'Job Title')
      .subscribe((data: IJobOffer[]) => {
        this.filteredJobs = data['Data'];
        console.log(this.searchBarInput)
      })
    }

    else if (this.sortBy === 'Sort Z-A') {
      this.jobService.universalSearchSortDesc(this.searchBarInput, 'Job Title')
      .subscribe((data: IJobOffer[]) => {
        this.filteredJobs = data['Data'];
        console.log(this.searchBarInput)
      })
    }
    else if (this.searchBarInput == null) {
      this.jobService.showAvalaibleJobs()
      .subscribe((data: IJobOffer[]) => {
        this.availableJobs = data['Data'];
        this.filteredJobs = this.availableJobs;
      })
    }
    else
    {
      this.jobService.universalSearch(this.searchBarInput)
      .subscribe((data: IJobOffer[]) => {
        this.filteredJobs = data['Data'];
        console.log(this.searchBarInput)
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

  // filterAll(){

  // }

  constructor
    (private router: Router,
    private jobService: JobService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    console.log(this.selectedFilter)

    this.jobService.showAvalaibleJobs()
      .subscribe((data: IJobOffer[]) => {
        this.availableJobs = data['Data'];
        this.filteredJobs = this.availableJobs;
      })


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