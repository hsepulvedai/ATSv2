//This page opens the aplication for the selected job in A2 when clicking on the apply button
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { IJobOffer } from '../../../shared/models/job-offer.model';
import { JobService } from '../../../shared/services/job.service';
import { IApplication } from '../../../shared/models/application.model';
import { ApplicationService } from '../../../shared/services/application.service';
import { IApplicant } from '../../../shared/models/applicant.model';
import { IUser } from '../../../shared/models/user.model';
import { IApplicantApply } from '../../../shared/models/applicant-apply.model';

@Component({
  selector: 'app-offer-application', 
  templateUrl: './offer-application.component.html',
  styleUrls: ['./offer-application.component.css']
})
export class OfferApplicationComponent implements OnInit {

  hideApplicantInfoForm: boolean = true;

  job: IJobOffer
  application: IApplication
  applicant:IApplicant
  applicantId:number
  user:IUser

  applicantInfoForm: FormGroup

  currentApplicant: IApplicantApply 
  jobLoaded: Promise<boolean>
  getJobSubscription

  constructor(private jobService: JobService,
    private applicationService: ApplicationService, private formBuilder:FormBuilder) { }

  ngOnInit() {

    this.getJobSubscription = this.getJobSubscription =  this.jobService.showJobOfferDetail(this.jobService.currentJobId)
    .subscribe((data: IJobOffer) => {
        this.job = data['Data'][0];

          this.jobLoaded = Promise.resolve(true); // Setting the Promise as resolved after I have the needed data
      }
);

    this.jobService.showJobOfferDetail(this.jobService.currentJobId)
    .subscribe((data: IJobOffer) => {
      this.job = data['Data'][0];
      console.log(this.job)
    })

    // dummy applicant
    this.currentApplicant = {
      applicantId: 15,
      firstName: 'Mark',
      lastName: 'Tesla',
      email: 'dummyMark@mail.com',
      phone: '888-555-8585',
      addressLine:'123 Peppermint St.',
      addressLine2:'Block 24A',
      city:'Los Angeles',
      stateProvince:'California',
      country:'United States',
      zipCode:'99956',
      // comments: 'These are comments. I am cool.'
    }

    this.applicantInfoForm = this.formBuilder.group({
      name: {value: this.currentApplicant.firstName + ' ' + this.currentApplicant.lastName, disabled:true},
      email: [this.currentApplicant.email, [Validators.required, Validators.minLength(4), Validators.email, Validators.maxLength(256)]],
      phone: [this.currentApplicant.phone, [Validators.pattern('[0-9-]+'), Validators.required, Validators.minLength(7), Validators.maxLength(30)]],
      addressLine: [this.currentApplicant.addressLine, [Validators.required, Validators.maxLength(50)]],
      addressLine2:[this.currentApplicant.addressLine2],
      state: [this.currentApplicant.stateProvince, [Validators.required, Validators.maxLength(30)]],
      country: [this.currentApplicant.country, [Validators.required, Validators.maxLength(30)]],
      city: [this.currentApplicant.city,[Validators.required, Validators.maxLength(30)]],
      zipCode:[this.currentApplicant.zipCode,[Validators.required, Validators.maxLength(18)]],
      comments:[this.currentApplicant.comments, [Validators.maxLength(30)]]
    }) 
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
  }

  initilizeFormValues() {
    this.applicantInfoForm.setValue( {
      name:this.currentApplicant.firstName + ' ' + this.currentApplicant.lastName,
      email:this.currentApplicant.email,
      phone:this.currentApplicant.phone,
      addressLine:this.currentApplicant.addressLine,
      addressLine2:this.currentApplicant.addressLine2,
      state:this.currentApplicant.stateProvince,
      country: this.currentApplicant.country,
      city: this.currentApplicant.city,
      zipCode: this.currentApplicant.zipCode,
      comments: ''
    })


  }

  validAddress(form):boolean {

    return (form.controls.addressLine.invalid && form.controls.addressLine.touched) ||
      (form.controls.city.invalid && form.controls.city.touched) ||
      (form.controls.state.invalid && form.controls.state.touched) ||
      (form.controls.country.invalid && form.controls.country.touched) ||
      (form.controls.zipCode.invalid && form.controls.zipCode.touched)
  }

  changeInputColor(){
    if(this.applicantInfoForm.get('email').errors.required) {
      let myDiv = document.getElementById('my-div');
      myDiv.style.color = 'orange';
    }

    return true;

  }

  showForm(event) {

    if(event.target.id == 'profileInfoBtn') {
      this.hideApplicantInfoForm = false;
      this.initilizeFormValues();
      this.applicantInfoForm.controls.email.disable
    }


    if (event.target.id == 'newInfoBtn') {

    }



  }

}
