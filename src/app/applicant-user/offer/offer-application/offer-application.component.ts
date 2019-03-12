import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { JobService } from '../../../shared/services/job.service';
import { IApplication } from '../../../shared/models/application.model';
import { ApplicationService } from '../../../shared/services/application.service';
import { IApplicant } from '../../../shared/models/applicant.model';
import { IUser } from '../../../shared/models/user.model';
import { IApplicantApply } from '../../../shared/models/applicant-apply.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { IJob } from 'src/app/shared/models/job.model';
import { SkillService } from 'src/app/shared/services/skill.service';

/*
  This component consists of the information for a selected job
  and provides a form initilized with logged in applicant 
  information to upload a resume and apply for the selected job
  providing requested information.

  TODO: Ouput application infomation to api and database.
*/
@Component({
  selector: 'app-offer-application',
  templateUrl: './offer-application.component.html',
  styleUrls: ['./offer-application.component.css']
})
export class OfferApplicationComponent implements OnInit {

  hideApplicantInfoForm: boolean = true;

  job: IJob;
  application: IApplication;
  applicant: IApplicant;
  applicantId: number;
  user: IUser;

  applicantInfoForm: FormGroup;

  currentApplicant: IApplicantApply;
  jobLoaded: Promise<boolean>;
  getJobSubscription: Subscription;

  skills

  constructor(private jobService: JobService,
    private applicationService: ApplicationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router,
    private skillService:SkillService) { }

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id');

    this.getJobSubscription = this.jobService.showJobOfferDetail(id)
      .subscribe((data: IJob) => {
        this.job = data['Data'][0];
        this.skills = this.skillService.skillParse(this.job.jobSkills)

  
        if (this.job == undefined)
          this.router.navigate(['jobs'])
        // Setting the Promise as resolved after I have the needed data
        // to allow loading data into DOM
        this.jobLoaded = Promise.resolve(true);
      });

    // initialize dummy applicant
    this.currentApplicant
      = {
        applicantId: 15,
        firstName: 'Dummy',
        lastName: 'Login',
        email: 'dummyMark@mail.com',
        phone: '888-555-8585',
        addressLine: '123 Peppermint St.',
        addressLine2: 'Block 24A',
        city: 'Los Angeles',
        stateProvince: 'California',
        country: 'United States',
        zipCode: '99956'
      }

    // initialize application form
    this.applicantInfoForm = this.formBuilder.group({
      name: { value: this.currentApplicant.firstName + ' ' + this.currentApplicant.lastName, disabled: true },
      email: [this.currentApplicant.email, [Validators.required, Validators.minLength(4), Validators.email, Validators.maxLength(256)]],
      phone: [this.currentApplicant.phone, [Validators.pattern('[0-9-]+'), Validators.required, Validators.minLength(7), Validators.maxLength(30)]],
      addressLine: [this.currentApplicant.addressLine, [Validators.required, Validators.maxLength(50)]],
      addressLine2: [this.currentApplicant.addressLine2],
      state: [this.currentApplicant.stateProvince, [Validators.required, Validators.maxLength(30)]],
      country: [this.currentApplicant.country, [Validators.required, Validators.maxLength(30)]],
      city: [this.currentApplicant.city, [Validators.required, Validators.maxLength(30)]],
      zipCode: [this.currentApplicant.zipCode, [Validators.required, Validators.maxLength(18)]],
      comments: [this.currentApplicant.comments, [Validators.maxLength(30)]]
    });
  }

  /* Creates and application and makes the call to the service to send
      input data. */
  submitApplication(form) {

    this.application = {
      jobId: this.job.jobId,
      applicantId: this.currentApplicant.applicantId,
      applicantEmail: form.email,
      applicantPhone: form.phone,
      addressLine: form.addressLine,
      addressLine2: form.addressLine2,
      city: form.city,
      stateProvince: form.state,
      country: form.country,
      zipCode: form.zipCode,
      comments: form.comments
    }

    this.applicationService.insertApplication(this.application).subscribe(data => {
      alert('Application submitted.')
      this.router.navigate(['/jobs'])
    });
  }

  /* Initialize form with profile values.*/
  initilizeFormValues() {
    this.applicantInfoForm.setValue({
      name: this.currentApplicant.firstName + ' ' + this.currentApplicant.lastName,
      email: this.currentApplicant.email,
      phone: this.currentApplicant.phone,
      addressLine: this.currentApplicant.addressLine,
      addressLine2: this.currentApplicant.addressLine2,
      state: this.currentApplicant.stateProvince,
      country: this.currentApplicant.country,
      city: this.currentApplicant.city,
      zipCode: this.currentApplicant.zipCode,
      comments: ''
    });
  }

  /* Validates all address fields.*/
  validAddress(form): boolean {
    return (form.controls.addressLine.invalid && form.controls.addressLine.touched) ||
      (form.controls.city.invalid && form.controls.city.touched) ||
      (form.controls.state.invalid && form.controls.state.touched) ||
      (form.controls.country.invalid && form.controls.country.touched) ||
      (form.controls.zipCode.invalid && form.controls.zipCode.touched);
  }

  changeInputColor() {
    if (this.applicantInfoForm.get('email').errors.required) {
      let myDiv = document.getElementById('my-div');
      myDiv.style.color = 'orange';
    }
    return true;
  }

  showForm(event) {

    if (event.target.id == 'profileInfoBtn') {
      this.hideApplicantInfoForm = false;
      this.applicantInfoForm.reset();
      this.initilizeFormValues();
      // this.applicantInfoForm.controls.email.disable
    }

    if (event.target.id == 'newInfoBtn') {
      this.hideApplicantInfoForm = false;
      this.applicantInfoForm.reset();
      this.applicantInfoForm.get('name').setValue(this.currentApplicant.firstName
        + ' ' + this.currentApplicant.lastName)
    }
  }

  onFileChanged() {
    // TODO: Change the selected file in memory
  }

  uploadFile() {
    // TODO: Upload file to determined repo
    // TODO: Create file Url reference
  }

}