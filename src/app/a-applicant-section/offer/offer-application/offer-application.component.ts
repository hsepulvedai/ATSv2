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

  currentApplicant: IApplicantMaintInfo 

  constructor(private jobService: JobService, private router: Router,
    private applicationService: ApplicationService, private userService:UserService,
    private applicantService:ApplicantService) { }




  ngOnInit() {

    // this.applicantService.showApplicantById(1)
    // .subscribe((data:IApplicantMaintInfo) => {
    //   this.currentApplicant = data['Data']
    //   console.log(this.currentApplicant)
    // })

    this.currentApplicant = {
      applicantId: 11,
      firstName: 'Dummy',
      lastName: 'Dumms',
      email: 'dummy@mail.com',
      phone: '111-111-8888',
      addressLine:'123 Oak St.',
      addressLine2:'Block Z',
      city:'San Juan',
      stateProvince:'Puerto Rico',
      country:'United States',
      zipCode:'88595'
    }
  

    this.jobService.showJobOfferDetail(this.jobService.currentJobId)
      .subscribe((data: IJobOffer) => {
        this.job = data['Data'][0];
      })

      
    this.name = new FormControl({value: this.currentApplicant.firstName + ' ' + this.currentApplicant.lastName, disabled:true})
    this.email = new FormControl(this.currentApplicant.email)
    this.phone = new FormControl(this.currentApplicant.phone)

    
    this.addressLine= new FormControl(this.currentApplicant.addressLine)
    this.addressLine2= new FormControl(this.currentApplicant.addressLine2)
    this.state= new FormControl(this.currentApplicant.stateProvince)
    this.country= new FormControl(this.currentApplicant.country)
    this.city = new FormControl(this.currentApplicant.city)
    this.zipCode = new FormControl(this.currentApplicant.zipCode)

    this.applicantInfo = new FormGroup({
      name: this.name,
      email: this.email,
      phone: this.phone,
      addressLine:this.addressLine,
      addressLine2:this.addressLine2,
      state:this.state,
      country:this.country,
      city:this.city,
      zipCode:this.zipCode
    })

  }

  loadForm() {
    
  }

  submitApplication(form) {
    this.application = {
      jobId: this.jobService.currentJobId,
      applicantId: this.currentApplicant.applicantId,
      email: form.email,
      phone: form.phone,
      addressLine:form.addressLine,
      addressLine2:form.addressLine2,
      city:form.city,
      stateProvince:form.state,
      country:form.country,
      zipCode:form.zipCode,
      comments:form.comments
    }


    this.applicationService.insertApplication(this.application)
      .subscribe(data => { console.log("POST:" + data) },
      error => { console.error("Error: ", error) })
  }


}
