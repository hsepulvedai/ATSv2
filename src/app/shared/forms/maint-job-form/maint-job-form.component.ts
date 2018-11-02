import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IJobType } from '../../models/job_type.model';
import { IJobStatus } from '../../models/job_status.model';
import { JobTypeService } from '../../services/job-type.service';
import { JobStatusService } from '../../services/job-status.service';
import { IJobCategory } from '../../models/job_category.model';
import { JobCategoryService } from '../../services/job-category.service';
import { IJobInsert } from '../../models/job_insert.model';
import { CompanyService } from '../../services/company.service';
import { ICompany } from '../../models/company.model';
import { JobService } from '../../services/job.service';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'maint-job-form',
  templateUrl: './maint-job-form.component.html',
  styleUrls: ['./maint-job-form.component.css']
})
export class MaintJobFormComponent implements OnInit {

  @Input()
  company

  // @Output() submitForm = new EventEmitter<boolean>();
  @Output() submittedForm

  jobInfoForm: FormGroup
  categories: IJobCategory[]
  types: IJobType[]
  allStatus: IJobStatus[]

  createdJob: IJobInsert
  currentCompany: ICompany

  selectedJobCategory
  selectedJobType
  selectedJobStatus


  constructor(private formBuilder: FormBuilder, private jobTypeService: JobTypeService,
    private jobStatusService: JobStatusService, private jobCategoryService: JobCategoryService,
    private companyService: CompanyService) { }

    // sendForm(){
    //   this.submitForm.emit(this.jobInfoForm)
    // }

  ngOnInit() {

    // Must change to the employee's company when auth is set
    this.companyService.getCompanyById(1)
      .subscribe((data: ICompany) => {
        this.currentCompany = data['Data'];
      })


    this.jobCategoryService.showCategories()
      .subscribe((data: IJobCategory[]) => {
        this.categories = data['Data'];
      })

    this.jobTypeService.showTypes()
      .subscribe((data: IJobType[]) => {
        this.types = data['Data']
      })

    this.jobStatusService.showAllStatus()
      .subscribe((data: IJobStatus[]) => {
        this.allStatus = data['Data']
      })


    this.jobInfoForm = this.formBuilder.group({
      jobName: ['', 
      // Validators.required
    ],
      jobCompany: [''],
      jobCategory: ['', 
      // Validators.required
    ],
      jobType: ['',
      //  Validators.required
    ],
      jobStatus: [''],
      jobDescription: ['', Validators.maxLength(500)],
      addCategoryInput: '',
      addTypeInput: '',
      addStatusInput: ''
    })

    // this.jobInfoForm.controls.get('jobCompany').disable()
  }

    selectJobCatChangeHandler(event: any) {
    //update the ui
    this.selectedJobCategory = event.target.value;
  }


  selectJobStatChangeHandler(event: any) {
    this.selectedJobStatus = event.target.value;
  }

  selectJobTypeChangeHandler(event: any) {
    this.selectedJobType = event.target.value;
  }



}
