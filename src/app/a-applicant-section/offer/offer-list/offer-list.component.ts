import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
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

  availableJobs:IJobOffer[]
  job:IJob

  filteredJobs: IJobOffer[]


  searchForm: FormGroup 
  search: FormControl
  filter: FormControl


  constructor
  ( private router: Router,
    private jobService: JobService, 
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.jobService.showAvalaibleJobs()
    .subscribe((data:IJobOffer[]) => {
      this.availableJobs = data['Data'];
  })


    this.search = new FormControl();
    this.filter = new FormControl(); 


    this.searchForm = new FormGroup(
      {
        search: this.search,
        filter: this.filter
      }
    )
  }

  applyButtonClicked(jobId:number){

    this.jobService.currentJobId = jobId;
    this.router.navigate(['offer-application'])
  
  }

}