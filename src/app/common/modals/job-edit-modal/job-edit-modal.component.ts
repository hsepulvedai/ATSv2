import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobCategoryService } from 'src/app/shared/services/job-category.service';
import { JobTypeService } from 'src/app/shared/services/job-type.service';
import { IJobCategory } from 'src/app/shared/models/job_category.model';
import { IJobType } from 'src/app/shared/models/job_type.model';
import { IJobStatus } from 'src/app/shared/models/job_status.model';
import { JobStatusService } from 'src/app/shared/services/job-status.service';
import { IJob } from 'src/app/shared/models/job.model';
import { JobService } from 'src/app/shared/services/job.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'job-edit-modal',
  templateUrl: './job-edit-modal.component.html',
  styleUrls: ['./job-edit-modal.component.css']
})

export class JobEditModalComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private jobCategoryService: JobCategoryService
    , private jobTypeService: JobTypeService, private jobStatusService: JobStatusService
    , private jobService:JobService, private router: Router
    , private modalService: ModalService
    ) { }

  jobInfoForm: FormGroup

  @Input()
  modalType:string
  @Input()
  modalTitle:string

  @Input()
  job:IJob

  @Input()
  jobId:string
  @Input()
  jobName: string
  @Input()
  company: string
  @Input()
  city: string
  @Input()
  country: string
  @Input()
  category: string
  @Input()
  type: string
  @Input()
  status: string
  @Input()
  description: string
  @Input()
  isActive:boolean

  categories: IJobCategory
  types: IJobType
  allStatus: IJobStatus

  editJobTrue:boolean = false
  addJobTrue:boolean = false
  editDraftTrue:boolean = false

  updatedJob:IJob

  ngOnInit() {

    this.jobCategoryService.showCategories()
      .subscribe((data: IJobCategory[]) => {
        this.categories = data['Data'];
      });

    this.jobTypeService.showTypes()
      .subscribe((data: IJobType[]) => {
        this.types = data['Data']
      });

    this.jobStatusService.showAllStatus()
      .subscribe((data: IJobStatus[]) => {
        this.allStatus = data['Data']
      });


    this.jobInfoForm = this.formBuilder.group({
      jobName: [this.jobName, Validators.required],
      jobCompany: this.company,
      jobCity: this.city,
      jobCountry: this.country,
      jobCategory: this.category.toString(),
      jobType: this.type,
      jobStatus: this.status,
      jobDescription: [this.description, Validators.maxLength(500)],
      addCategoryInput: '',
      addTypeInput: '',
      activeJob:(this.isActive.toString() =="true")
    });

    if (this.modalType === 'edit')
      this.editJobTrue = true

    if(this.modalType === 'create')
      this.addJobTrue = true

    if (this.modalType === 'draft')
      this.editDraftTrue = true

  }

  updateJob(updatedJobForm) {

    this.createUpdatedJob(updatedJobForm).then( date => {
      this.jobService.updateJob(this.updatedJob)
      .subscribe(data => { 
        this.modalService.closeModal()
      }
      ,
        error => { console.error("Error: ", error) })
    }
    ).then( result => {
      window.location.reload()
    })}

  createUpdatedJob(updatedJobForm):Promise<any> {
    this.updatedJob = {
      jobId: Number.parseInt(this.jobId),
      jobName: updatedJobForm.jobName,
      jobCategory: updatedJobForm.jobCategory,
      jobType: updatedJobForm.jobType,
      jobStatus: updatedJobForm.jobStatus,
      jobDescription: updatedJobForm.jobDescription
    }

    return Promise.resolve()
  }

  modalClose() {
    this.modalService.closeModal()
  }


}
