import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { JobService } from '../../../shared/services/job.service';
import { IJobOfferHR } from '../../../shared/models/job-offer-hr.model';
import { IJobOffer } from '../../../shared/models/job-offer.model';
@Component({
  selector: 'app-offer-list-management',
  templateUrl: './offer-list-management.component.html',
 // styleUrls: ['./offer-list-management.component.css']
})
export class OfferListManagementComponent implements OnInit {

  jobs:IJobOfferHR[]
  job:IJobOffer
  applicationCount:number
  jobId:number
  

  constructor(private router : Router, private jobService:JobService) { }

  ngOnInit() {
    this.jobService.showAvalaibleJobs()
    .subscribe((data:IJobOfferHR[]) => {
      this.jobs = data['Data'];
    })

  }

  goToOfferDetail(id){
    this.jobService.currentJobId = id;

  this.router.navigate(['hr-offer-detail'])
}

}
