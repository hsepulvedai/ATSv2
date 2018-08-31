import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '../../../../../node_modules/@angular/forms';
import { IJobOffer } from '../../../shared/models/job-offer.model';
import { JobService } from '../../../shared/services/job.service';
import { IJob } from '../../../shared/models/job.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-application',
  templateUrl: './offer-application.component.html',
  //styleUrls: ['./offer-application.component.css']
})
export class OfferApplicationComponent implements OnInit {

  job:IJobOffer

  trackForm: FormGroup
  name:FormControl
  email: FormControl

  constructor(private jobService:JobService, private router:Router) { }

  ngOnInit() {

    this.jobService.showJobOfferDetail(this.jobService.currentJobId)
            .subscribe((data:IJobOffer) => {
                this.job = data['Data'];
            })


  //   this.jobService.showJobOfferDetail(this.jobService.currentJobId)
  //   .subscribe((data:IJobOffer) => {
  //     this.job = data['Data'];
  //     this.jobService.currentJob = this.job;
  // })


  //   this.email
  //   this.email = new FormControl()

  //   this.trackForm = new FormGroup({
  //     email: this.email
  //   })
  }


  // goToOfferStatus(email){

  // }

}

