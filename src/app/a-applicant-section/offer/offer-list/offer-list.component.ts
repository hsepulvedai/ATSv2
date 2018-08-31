import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from '../../../shared/services/job.service';
import { IJob } from '../../../shared/models/job.model';
import { IJobOffer } from '../../../shared/models/job-offer.model';
@Component({
  selector: 'app-view-available-jobs',
  templateUrl: './offer-list.component.html',
  //styleUrls: ['./view-available-jobs.component.css']
})
export class OfferListComponent implements OnInit {

  availableJobs: IJobOffer[]
  job: IJobOffer

  searchForm: FormGroup
  search: FormControl
  filter: FormControl

  _listFilter: string;


  selectedFilter: string = '';


  //event handler for the select element's change event
  selectDropdownChangeHandler(event: any) {
    //update the ui
    this.selectedFilter = event.target.value;
    console.log(this.selectedFilter)
  }

  get listFilter(): string {
    return this._listFilter;

  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredJobs = this.listFilter ? this.performFilter(this.listFilter) : this.availableJobs;
  }

  filteredJobs: IJobOffer[]



  performFilter(filterBy: string): IJobOffer[] {
    filterBy = filterBy.toLocaleLowerCase();

    if (this.selectedFilter === 'Company')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.company.toLocaleLowerCase().indexOf(filterBy) !== -1);

    // if (this.selectedFilter === 'Location')
    // return this.availableJobs.filter((job: IJobOffer) => {
    //   job.city.toLocaleLowerCase().indexOf(filterBy) !== -1),
    //   job.countr.toLocaleLowerCase().indexOf(filterBy) !== -1),
    // }

    else if (this.selectedFilter === 'Category')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.jobCategory.toLocaleLowerCase().indexOf(filterBy) !== -1);
    else if (this.selectedFilter === 'Type')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.jobType.toLocaleLowerCase().indexOf(filterBy) !== -1);
    else
    return this.availableJobs.filter((job: IJobOffer) =>
        job.jobName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }




  constructor
    (private router: Router,
    private jobService: JobService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {


    this.jobService.showAvalaibleJobs()
      .subscribe((data: IJobOffer[]) => {
        this.availableJobs = data['Data'];
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