import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '../../../../../node_modules/@angular/forms';
import { IJobOffer } from '../../../shared/models/job-offer.model';
import { JobService } from '../../../shared/services/job.service';
import { IJob } from '../../../shared/models/job.model';
import { Router } from '@angular/router';
import { IApplicantMaintInfo } from '../../../shared/models/applicant_maintenance.model';
import { IApplication } from '../../../shared/models/application.model';
import { ApplicationService } from '../../../shared/services/application.service';
import { UserService } from '../../../shared/user.service';
import { ApplicantService } from '../../../shared/services/applicant.service';
import { IApplicant } from '../../../shared/models/applicant.model';
import { IUser } from '../../../shared/models/user.model';

@Component({
  selector: 'app-offer-application',
  templateUrl: './offer-application.component.html',
  //styleUrls: ['./offer-application.component.css']
})
export class OfferApplicationComponent implements OnInit {

  job: IJobOffer
  application: IApplication
  applicant:IApplicant
  applicantId:number
  user:IUser

  applicantInfo: FormGroup
  name: FormControl
  email: FormControl
  phone: FormControl
  addressLine: FormControl
  addressLine2: FormControl
  state: FormControl
  country: FormControl
  city: FormControl
  zipCode: FormControl

  dummyApplicant: IApplicantMaintInfo 

  constructor(private jobService: JobService, private router: Router,
    private applicationService: ApplicationService, private userService:UserService,
    private applicantService:ApplicantService) { }

  ngOnInit() {

    this.dummyApplicant = {
      applicantId: 6,
      firstName: 'Dummy',
      lastName: 'Dumm',
      email: 'mnpen@mail.com',
      phone: '787-963-6654',
    }
  
    // this.applicantService.getApplicantById(4)
    // .subscribe((data:IApplicant) => {
    //   this.applicant = data['Data']
    //   this.applicantId = this.applicant.id

    //   this.userService.getUserById(this.applicantId)
    //   .subscribe((data: IUser) => {
    //     this.user = data['Data'][0]


      // this.dummyApplicant.applicantId = this.applicant.id
      // this.dummyApplicant.firstName = this.user.firstName
      // this.dummyApplicant.lastName = this.user.lastName
      // this.dummyApplicant.email = this.user.email
      // this.dummyApplicant.phone = this.applicant.phone
    //   })
    // })




    // this.jobService.showJobOfferDetail(this.jobService.currentJobId)
    //   .subscribe((data: IJobOffer) => {
    //     this.job = data['Data'][0];
    //     console.log(this.job)
    //   })

    this.name = new FormControl({value: this.dummyApplicant.firstName + ' ' + this.dummyApplicant.lastName, disabled:true})
    this.email = new FormControl(this.dummyApplicant.email)
    this.phone = new FormControl(this.dummyApplicant.phone)
    // this.addressLine= new FormControl(this.dummyApplicant.addressLine)
    // this.addressLine2= new FormControl(this.dummyApplicant.addressLine2)
    // this.state= new FormControl(this.dummyApplicant.stateProvince)
    // this.country= new FormControl(this.dummyApplicant.country)
    // this.city = new FormControl(this.dummyApplicant.city)
    // this.zipCode = new FormControl(this.dummyApplicant.zipCode)

    this.applicantInfo = new FormGroup({
      name: this.name,
      email: this.email,
      phone: this.phone,
      // addressLine:this.addressLine,
      // addressLine2:this.addressLine2,
      // state:this.state,
      // country:this.country,
      // city:this.city,
      // zipCode:this.zipCode
    })

  }

  submitApplication(form) {
    this.application = {
      jobId: this.jobService.currentJobId,
      applicantId: this.dummyApplicant.applicantId,
      email: form.email,
      phone: form.phone
    }

    this.applicationService.insertApplication(this.application)
      .subscribe(data => { console.log("POST:" + data) },
      error => { console.error("Error: ", error) })
  }


}
