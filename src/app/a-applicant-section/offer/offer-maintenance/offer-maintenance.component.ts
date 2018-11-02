//This page allows HR employee to control what jobs are available to be applied for. (Jobs shown in A2)
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { JobService } from '../../../shared/services/job.service';
import { IJobOffer } from '../../../shared/models/job-offer.model';
import { IJobCategory } from '../../../shared/models/job_category.model';
import { JobCategoryService } from '../../../shared/services/job-category.service';
import { IJobType } from '../../../shared/models/job_type.model';
import { JobTypeService } from '../../../shared/services/job-type.service';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from '../../../shared/services/company.service';
import { ICompany } from '../../../shared/models/company.model';
import { IJobInsert } from '../../../shared/models/job_insert.model';
import { IJobUpdate } from '../../../shared/models/job_update.model';
import { PaginationService } from '../../../shared/services/pagination.service';
import { Sort } from '@angular/material';
import { Subscription } from 'rxjs';
import { JobStatusService } from '../../../shared/services/job-status.service';
import { IJobStatus } from '../../../shared/models/job_status.model';
import { ModalService } from '../../../shared/services/modal.service';
import { IJob } from '../../../shared/models/job.model';

@Component({
  selector: 'app-offer-maintenance',
  templateUrl: './offer-maintenance.component.html',
  styleUrls: ['./offer-maintenance.component.css']
})
export class OfferMaintenanceComponent implements OnInit, OnDestroy {


  private jobSubscription: Subscription = new Subscription();
  private jobTotalSubscription: Subscription = new Subscription();
  private jobInactiveSubscription: Subscription = new Subscription();
  private jobInactiveTotalSubscription: Subscription = new Subscription();
  private draftSubscription: Subscription = new Subscription();
  private draftTotalSubscription: Subscription = new Subscription();

  private categorySubscription: Subscription = new Subscription();
  // private typeSubscription: Subscription = new Subscription();

  // Used to calculate job count on page HTML
  pageSize = this.pagination.pageSize


  titleAvailaleTable:string = 'Available Jobs'
  titleInactiveTable:string = 'Past Jobs'
  titleDraftsTable:string = 'Drafts'
  


  activePageNumber: number = this.pagination.pageNumber
  inactivePageNumber: number = this.pagination.pageNumber
  draftPageNumber: number = this.pagination.pageNumber

  activeCollectionSize: number
  inactiveCollectionSize: number
  draftsCollectionSize: number

  activePaginatorSize: number
  inactivePaginatorSize: number
  draftPaginatorSize: number

  totalActiveJobs: number
  paginatorCollectionSize: number

  searchBarInput: string

  availableJobs: IJobOffer[]

  // job: IJobOffer

  pageInactive: number = this.pagination.pageNumber;
  paginatorSizeInactive: number
  totalInactiveJobs: number
  paginatorCollectionSizeInactive: number
  // sortByInactive: string

  totalDrafts: number
  draftsFilteredJobs: IJobOffer[]
  draftJobs: IJobOffer[]

  // addDropdownOptForm: FormGroup

  addJobTrue: boolean = false
  editJobTrue: boolean = false
  editDraftTrue: boolean = false

  addJobFormTitle:string = "Add Job"


  constructor(
    private jobService: JobService,
    private jobCategoryService: JobCategoryService,
    private jobTypeService: JobTypeService,
    private companyService: CompanyService,
    private jobStatusService: JobStatusService,
    private pagination: PaginationService,
    // private modalService: NgbModal,
    private formBuilder: FormBuilder,
  private modalService:ModalService) { }

  ngOnInit() {

    // Must change to the employee's company when auth is set
    this.companyService.getCompanyById(1)
      .subscribe((data: ICompany) => {
        this.currentCompany = data['Data'];
      })

    setTimeout(() => { this.refreshData() }, 50)

    // this.categorySubscription.add(
    //   this.jobCategoryService.showCategories()
    //     .subscribe((data: IJobCategory[]) => {
    //       this.categories = data['Data'];
    //     })
    // )

    // this.jobTypeService.showTypes()
    //   .subscribe((data: IJobType[]) => {
    //     this.types = data['Data']
    //   })

    // this.jobStatusService.showAllStatus()
    //   .subscribe((data: IJobStatus[]) => {
    //     this.allStatus = data['Data']
    //   })

    this.jobInfoForm = this.formBuilder.group({
      jobName: ['', Validators.required],
      jobCompany: [''],
      jobCategory:['', Validators.required],
      jobType: ['', Validators.required],
      jobStatus: [''],
      jobDescription: ['', Validators.maxLength(500)],
      addCategoryInput: '',
      addTypeInput: '',
      addStatusInput: ''
    })

    // this.newJobForm = this.formBuilder.group({
    //   jobName: ['', Validators.required],
    //   jobCompany: '',
    //   jobCity: '',
    //   jobCountry: '',
    //   jobCategory: '',
    //   jobType: '',
    //   jobDescription: ['', Validators.maxLength(500)],
    //   addCategoryInput: '',
    //   addTypeInput: ''
    // })

    // this.jobEditForm = this.formBuilder.group({
    //   name: '',
    //   category: '',
    //   type: '',
    //   status: '',
    //   description: ''
    // })

    // this.draftEditForm = this.formBuilder.group({
    //   draftName: '',
    //   draftCategory: '',
    //   draftType: '',
    //   draftDescription: ''
    // })

    // this.addDropdownOptForm = this.formBuilder.group({
    //   input: ''
    // })

  }

  openModal(content, job, event) {

    if (event.target.id === 'editJobButton' || event.target.id === 'editDraftBtn') {
      this.jobInfoForm.get('jobName').setValue(job.jobName)
      this.jobInfoForm.controls['jobStatus'].setValue(job.jobStatus, { onlySelf: true })
      this.jobInfoForm.controls['jobCategory'].setValue(job.jobCategory, { onlySelf: true })
      this.jobInfoForm.controls['jobType'].setValue(job.jobType, { onlySelf: true })
      this.jobInfoForm.get('jobDescription').setValue(job.description)
      this.jobService.setCurrentJobId(job.jobId)
    }

    if (event.target.id === 'editJobButton')
      this.editJobTrue = true;

    if (event.target.id === 'addJobBtn')
      this.addJobTrue = true;

    if (event.target.id === 'editDraftBtn')
      this.editDraftTrue = true;

      this.modalService.openModal(content)

    // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => { (this.closeResult = `Closed with: ${result}`) }, (reason) => {
    //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //     this.addJobTrue = false
    //     this.editJobTrue = false
    //     this.editDraftTrue = false
    //     this.jobInfoForm.reset();
    //   });
  }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC)
  //     return 'by pressing ESC';
  //   else if (reason === ModalDismissReasons.BACKDROP_CLICK)
  //     return 'by clicking on a backdrop';
  //   else
  //     return `with: ${reason}`;
  // }

  universalSearch() {

    if (this.searchBarInput != undefined) 
      this.refreshData()
  }

  loadPage(page: number) {

    this.activePageNumber = page

    // this.pagination.pageNumber = page
    if (this.searchBarInput === undefined) {
      this.jobService.universalSearch('_', page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.availableJobs = data['Data'];
          this.sortedData = this.availableJobs
        })
    }
    else {
      this.jobService.universalSearch(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.availableJobs = data['Data'];
          this.sortedData = this.availableJobs
        })
    }
  }

  loadPageInactive(page: number) {

    this.inactivePageNumber = page

    if (this.searchBarInput === undefined) {
      this.jobService.universalSearchInactive('_', page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.inactiveJobs = data['Data'];
          this.sortedInactive = this.inactiveJobs
        })
    }
    else {
      this.jobService.universalSearchInactive(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.inactiveJobs = data['Data'];
          this.sortedInactive = this.inactiveJobs
        })
    }
  }

  loadPageDrafts(page: number) {

    this.draftPageNumber = page

    if (this.searchBarInput === undefined) {
      this.jobService.universalSearchDrafts('_', page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.draftJobs = data['Data'];
          this.draftsFilteredJobs = this.draftJobs;
          this.sortedDrafts = this.draftJobs
        })
    }
    else {
      this.jobService.universalSearchDrafts(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.draftJobs = data['Data'];
          this.draftsFilteredJobs = this.draftJobs;
          this.sortedDrafts = this.draftJobs
        })
    }
  }


  currentCompany: ICompany
  selectedJobType: string = 'Default'
  selectedJobCategory: string = 'Default'
  selectedJobStatus: string = 'Default'
  createdJob: IJobInsert

  inactiveJobs: IJobOffer[]

  currentJobId: number
  currentJob: IJob

  categories: IJobCategory[]
  types: IJobType[]
  allStatus: IJobStatus[]

  closeResult: string;

  // newJobForm: FormGroup
  // jobEditForm: FormGroup

  // new variables to try to simplify code
  jobInfoForm: FormGroup
  selectedTabId: string


  currentJobType: string = ''
  currentJobCategory: string = ''

  updatedJob: IJobUpdate


  createJob(newJobForm) {

    // console.log('This is ' +this.sortedData)

    this.createdJob = {
      jobName: newJobForm.jobName,
      companyId: this.currentCompany.id,
      jobCategory: newJobForm.jobCategory,
      jobType: newJobForm.jobType,
      jobDescription: newJobForm.jobDescription
    }

    this.jobService.addJobMaintenance(this.createdJob)
      .subscribe(data => { console.log("POST:" + data) },
        error => { console.error("Error: ", error) })

    setTimeout(() => { this.refreshData() }, 200)

    // this.newJobForm.reset();
  }

  createDraft(newJobForm) {

    this.createdJob = {
      jobName: newJobForm.jobName,
      companyId: this.currentCompany.id,
      jobCategory: newJobForm.jobCategory,
      jobType: newJobForm.jobType,
      jobDescription: newJobForm.jobDescription
    }

    this.jobService.addDraft(this.createdJob)
      .subscribe(data => { console.log("POST:" + data) },
        error => { console.error("Error: ", error) })

    setTimeout(() => { this.refreshData() }, 200)

  }

  setJobActive(id) {

    this.jobService.setActiveJob(id)
      .subscribe(
        data => { console.log("UPDATED: ", data) },
        error => { console.log("Error", error) }
      );

    setTimeout(() => { this.refreshData() }, 200)
  }

  setJobInactive(id) {

    this.jobService.setInactiveJob(id)
      .subscribe(
        data => { console.log("UPDATED: ", data) },
        error => { console.log("Error", error) }
      );

    setTimeout(() => { this.refreshData() }, 200)
  }

  deleteDraft(id) {
    this.jobService.deleteDraft(id).subscribe(
      data => { console.log("DELETED: ", data) },
      error => { console.log("Error", error) }
    );

    setTimeout(() => { this.refreshData() }, 200)

  }

  postDraft() {
    this.jobService.setActiveJob(this.jobService.currentJobId)
      .subscribe(
        data => { console.log("UPDATED: ", data) },
        error => { console.log("Error", error) }
      );

    setTimeout(() => { this.refreshData() }, 200)
  }

  //event handler for the select element's change event
  selectJobTypeChangeHandler(event: any) {
    //update the ui
    this.selectedJobType = event.target.value;

    this.categories.forEach(category => {
      if (this.currentJobCategory = category.name)
        this.selectedJobCategory = category.name

    });
  }

  // selectJobCatChangeHandler(event: any) {
  //   //update the ui
  //   this.selectedJobCategory = event.target.value;
  // }


  // selectJobStatChangeHandler(event: any) {
  //   this.selectedJobStatus = event.target.value;
  // }

  updateJob(updatedJobForm, event) {

    this.updatedJob = {
      id: this.jobService.currentJobId,
      name: updatedJobForm.jobName,
      company: updatedJobForm.jobCompany,
      category: updatedJobForm.jobCategory,
      type: updatedJobForm.jobType,
      status: updatedJobForm.jobStatus,
      description: updatedJobForm.jobDescription
    }


    if (event.target.id === 'saveJobBtn') {
      this.jobService.updateJob(this.updatedJob)
        .subscribe(data => { console.log("Updated:" + data) },
          error => { console.error("Error: ", error) })
    }

    if (event.target.id === 'saveDraftBtn') {
      this.updatedJob.status = 'Draft'
      this.jobService.updateJob(this.updatedJob)
        .subscribe(data => { console.log("Updated:" + data) },
          error => { console.error("Error: ", error) })
    }



    setTimeout(() => { this.refreshData() })
  }

  draftUpdate: IJobUpdate

  // updateJobDraft(updatedJobDraft) {

  //   this.draftUpdate = {
  //     id: this.jobService.currentJobId,
  //     name: updatedJobDraft.draftName,
  //     category: updatedJobDraft.draftCategory,
  //     type: updatedJobDraft.draftType,
  //     status: 'Draft',
  //     description: updatedJobDraft.draftDescription
  //   }

  //   this.jobService.updateJob(this.draftUpdate)
  //     .subscribe(data => { console.log("Updated:" + data) },
  //       error => { console.error("Error: ", error) })

  //   setTimeout(() => { this.refreshData() }, 200)
  // }

  refreshData() {

    if (this.searchBarInput === undefined || this.searchBarInput === '') {
      // load active jobs
      this.jobTotalSubscription.add(
        this.jobService.universalSearchCount('_',
          this.pagination.pageNumber, this.pagination.pageSize)
          .subscribe((data: number) => {
            this.totalActiveJobs = data['Data'][0]
            this.pagination.setPageRange(this.totalActiveJobs)
            this.activePaginatorSize = this.pagination.paginatorSize
            this.activeCollectionSize = this.pagination.getCollectionSize()
          })
      )
      this.jobSubscription.add(
        this.jobService.universalSearch('_', this.pagination.pageNumber, this.pagination.pageSize)
          .subscribe((data: IJobOffer[]) => {
            this.availableJobs = data['Data'];
            // this.filteredJobs = this.availableJobs;
            this.sortedData = this.availableJobs.slice();
          })
      )

      // load inactive jobs
      this.jobInactiveTotalSubscription.add(
        this.jobService.universalSearchCountInactive('_',
          this.pagination.pageNumber, this.pagination.pageSize)
          .subscribe((data: number) => {
            this.totalInactiveJobs = data['Data'][0]
            this.pagination.setPageRange(this.totalInactiveJobs)
            this.inactivePaginatorSize = this.pagination.paginatorSize
            this.inactiveCollectionSize = this.pagination.getCollectionSize()
          })
      )

      this.jobInactiveSubscription.add(
        this.jobService.universalSearchInactive('_', this.pagination.pageNumber, this.pagination.pageSize)
          .subscribe((data: IJobOffer[]) => {
            this.inactiveJobs = data['Data'];
            this.sortedInactive = this.inactiveJobs.slice();
          })
      )
      // load drafts
      this.draftTotalSubscription.add(
        this.jobService.universalSearchCountDrafts()
          .subscribe((data: number) => {
            this.totalDrafts = data['Data'][0]
            this.pagination.setPageRange(this.totalDrafts)
            this.draftPaginatorSize = this.pagination.paginatorSize
            this.draftsCollectionSize = this.pagination.getCollectionSize()
          })
      )

      this.draftSubscription.add(
        this.jobService.universalSearchDrafts('_', this.pagination.pageNumber, this.pagination.pageSize)
          .subscribe((data: IJobOffer[]) => {
            this.draftJobs = data['Data'];
            // this.draftsFilteredJobs = this.draftJobs;
            this.sortedDrafts = this.draftJobs.slice();
          })
      )

    }
    else {
      // load active jobs
      this.jobService.universalSearchCount(this.searchBarInput,
        this.pagination.pageNumber, this.pagination.pageSize)
        .subscribe((data: number) => {
          this.totalActiveJobs = data['Data'][0]
          this.pagination.setPageRange(this.totalActiveJobs)
          this.activePaginatorSize = this.pagination.paginatorSize
          this.activeCollectionSize = this.pagination.getCollectionSize()
        })

      this.jobService.universalSearch(this.searchBarInput, this.pagination.pageNumber, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.availableJobs = data['Data'];
          this.sortedData = this.availableJobs.slice();
        })

      // load inactive jobs
      this.jobService.universalSearchCountInactive(this.searchBarInput,
        this.pagination.pageNumber, this.pagination.pageSize)
        .subscribe((data: number) => {
          this.totalInactiveJobs = data['Data'][0]
          this.pagination.setPageRange(this.totalInactiveJobs)
          this.inactivePaginatorSize = this.pagination.paginatorSize
          this.inactiveCollectionSize = this.pagination.getCollectionSize()
        })

      this.jobService.universalSearchInactive(this.searchBarInput, this.pagination.pageNumber, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.inactiveJobs = data['Data'];
          this.sortedInactive = this.inactiveJobs.slice();
        })

      // load drafts
      this.jobService.universalSearchCountDrafts()
        .subscribe((data: number) => {
          this.totalDrafts = data['Data'][0]
          this.pagination.setPageRange(this.totalInactiveJobs)
          this.draftPaginatorSize = this.pagination.paginatorSize
          this.draftsCollectionSize = this.pagination.getCollectionSize()
        })

      this.jobService.universalSearchDrafts(this.searchBarInput, this.pagination.pageNumber, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.draftJobs = data['Data'];
          this.draftsFilteredJobs = this.draftJobs;
          this.sortedDrafts = this.draftJobs.slice();
        })
    }
  }

  ngOnDestroy() {
    this.jobSubscription.unsubscribe()
    this.jobTotalSubscription.unsubscribe()
    this.jobInactiveSubscription.unsubscribe()
    this.jobInactiveTotalSubscription.unsubscribe()
    this.draftSubscription.unsubscribe()
    this.draftTotalSubscription.unsubscribe()
  }

  /// Sorting
  sortedData: IJobOffer[]
  sortedDrafts: IJobOffer[]
  sortedInactive: IJobOffer[]

  sortData(sort: Sort) {

    const aJobs = this.availableJobs.slice();
    const iJobs = this.inactiveJobs.slice();
    const dJobs = this.draftJobs.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedData = aJobs;
      this.sortedInactive = iJobs;
      this.sortedDrafts = dJobs;
      return;
    }

    this.sortedData = aJobs.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'jobName': return compare(a.jobName, b.jobName, isAsc);
        case 'company': return compare(a.company, b.company, isAsc);
        case 'location': return compare(a.city, b.city, isAsc);
        case 'jobType': return compare(a.jobType, b.jobType, isAsc);
        case 'jobCategory': return compare(a.jobCategory, b.jobCategory, isAsc);
        default: return 0;
      }
    });

    this.sortedInactive = iJobs.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'jobName': return compare(a.jobName, b.jobName, isAsc);
        case 'company': return compare(a.company, b.company, isAsc);
        case 'location': return compare(a.city, b.city, isAsc);
        case 'jobType': return compare(a.jobType, b.jobType, isAsc);
        case 'jobCategory': return compare(a.jobCategory, b.jobCategory, isAsc);
        default: return 0;
      }
    });

    this.sortedDrafts = dJobs.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'jobName': return compare(a.jobName, b.jobName, isAsc);
        case 'company': return compare(a.company, b.company, isAsc);
        case 'location': return compare(a.city, b.city, isAsc);
        case 'jobType': return compare(a.jobType, b.jobType, isAsc);
        case 'jobCategory': return compare(a.jobCategory, b.jobCategory, isAsc);
        default: return 0;
      }
    });
  }

  addCatTrue: boolean = false;
  addTypeTrue: boolean = false;
  addStatusTrue: boolean = false;

  addItem(event) {

    var key = event.target.id
    if (key === 'addCatBtn')
      this.addCatTrue = true;
    if (key === 'addTypeBtn')
      this.addTypeTrue = true;
    if (key === 'addStatusBtn')
      this.addStatusTrue = true;
  }

  cancelAddItem(event) {

    var key = event.target.id
    if (key === 'cancelAddCatBtn')
      this.addCatTrue = false;
    if (key === 'cancelAddTypeBtn')
      this.addTypeTrue = false;
    if (key === 'cancelAddStatusBtn')
      this.addStatusTrue = false;
  }

  newCategory: IJobCategory
  newType: IJobType

  changeDectector: ChangeDetectorRef


  /// Must make the dropdown refresh.
  addCategory() {
    this.newCategory = {
      // name: this.newJobForm.controls.addCategoryInput.value,
      createdBy: 'DummyUser'
    }

    this.categorySubscription.add(this.jobCategoryService.insertCategory(this.newCategory)
      .subscribe(data => { console.log("POST:" + data) },
        error => { console.error("Error: ", error) },
      ))

    this.refreshCategories()

    console.log(this.categories)
    // this.newJobForm.get('category').setValue(this.newCategory, { onlySelf: true })

    this.addCatTrue = false;

    // this.newJobForm.get('addCategoryInput').setValue('', { onlySelf: true })

    // $('.selectpicker').selectpicker('refresh')

  }

  refreshCategories() {
    this.categorySubscription.add(
      this.jobCategoryService.showCategories()
        .subscribe((data: IJobCategory[]) => {
          this.categories = data['Data'];
        })
    );
  }

  addJobType() {

  }

  setBooleansFalse() {
    this.addCatTrue = false;
    this.addTypeTrue = false;
    this.addStatusTrue = false;
  }

  submittedForm

  test() {
    console.log(this.submittedForm.value)
  }


}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}