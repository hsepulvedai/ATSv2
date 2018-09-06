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

  applicantInfo:FormGroup
  name:FormControl
  email:FormControl
  phone:FormControl
  addressLine:FormControl
  addressLine2:FormControl
  state:FormControl
  country:FormControl
  zipCode:FormControl


  constructor(private jobService:JobService, private router:Router) { }

  ngOnInit() {


    this.name= new FormControl()
    this.email= new FormControl()
    this.phone= new FormControl()
    this.addressLine= new FormControl()
    this.addressLine2= new FormControl()
    this.state= new FormControl()
    this.country= new FormControl()
    this.zipCode = new FormControl()

    this.applicantInfo = new FormGroup({
      applicantInfo: this.applicantInfo,
      name:this.name,
      email:this.email,
      phone:this.phone,
      addressLine:this.addressLine,
      addressLine2:this.addressLine2,
      state:this.state,
      country:this.country,
      zipCode:this.zipCode
    })

    this.jobService.showJobOfferDetail(this.jobService.currentJobId)
            .subscribe((data:IJobOffer) => {
                this.job = data['Data'];
                console.log(this.job)
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

