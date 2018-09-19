import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { JobService } from '../../../shared/services/job.service';
import { IJobOfferHR } from '../../../shared/models/job-offer-hr.model';
import { IJobOffer } from '../../../shared/models/job-offer.model';
import { ApplicationService } from '../../../shared/services/application.service'
@Component({
  selector: 'app-offer-list-management',
  templateUrl: './offer-list-management.component.html',
 // styleUrls: ['./offer-list-management.component.css']
})
export class OfferListManagementComponent implements OnInit {

  jobs:IJobOfferHR[]
  job:IJobOfferHR
  counts:number[]
  applicationCount:number[]
  jobId:number
  index = 0;
  

  constructor(private router : Router, private jobService:JobService, private applicantionService:ApplicationService) { }

  ngOnInit() {
    this.jobService.showAvalaibleJobsHR()
    .subscribe((data:IJobOfferHR[]) => {
      this.jobs = data['Data'];
      
      // console.log(this.jobs)
    
    
    })



  }

  goToOfferDetail(job){
    this.jobService.currentJob = job

  this.router.navigate(['hr-offer-detail'])
}

getCounts(id){

 this.applicantionService.getCount(id)
     .subscribe((data) => {
       this.applicationCount = data['Data'];
       console.log(this.applicationCount)
     })

     return this.applicationCount
}

}
