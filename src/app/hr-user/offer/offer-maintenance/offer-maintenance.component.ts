import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { JobService } from '../../../shared/services/job.service';
import { IJobCategory } from '../../../shared/models/job_category.model';
import { JobCategoryService } from '../../../shared/services/job-category.service';
import { IJobType } from '../../../shared/models/job_type.model';
import { JobTypeService } from '../../../shared/services/job-type.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from '../../../shared/services/company.service';
import { ICompany } from '../../../shared/models/company.model';
import { IJobInsert } from '../../../shared/models/job_insert.model';
import { PaginationService } from '../../../shared/services/pagination.service';
import { Sort } from '@angular/material';
import { Subscription } from 'rxjs';
import { JobStatusService } from '../../../shared/services/job-status.service';
import { IJobStatus } from '../../../shared/models/job_status.model';
import { IJob } from 'src/app/shared/models/job.model';

/* This components allows the hr user adding, removing and modifying
    jobs. It includes avalable jobs (active), past jobs (inactive)
    and drafts and allows the posting and unposting of the jobs in the
    applicant offer list. The creation and modification of job drafts
    is also permitted.
*/
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

  // Used to calculate job count on page
  pageSize = this.pagination.pageSize;

  // Paginator settings
  paginatorCollectionSize: number;

  // page numbers for each table
  activePageNumber: number = this.pagination.pageNumber;
  inactivePageNumber: number = this.pagination.pageNumber;
  draftPageNumber: number = this.pagination.pageNumber;

  // table collection size for pagination
  activeCollectionSize: number;
  inactiveCollectionSize: number;
  draftsCollectionSize: number;

  // paginator sizes
  activePaginatorSize: number;
  inactivePaginatorSize: number;
  draftPaginatorSize: number;

  // Forms
  addDropdownOptForm: FormGroup
  jobInfoForm: FormGroup;

  // Evaluate need.
  // modalTitle: string = "Hey"
  // job: IJobOffer

  // Variables for inactive jobs
  pageInactive: number = this.pagination.pageNumber;
  paginatorSizeInactive: number;
  totalInactiveJobs: number;
  paginatorCollectionSizeInactive: number;

  // Draft job variables
  totalDrafts: number;
  draftsFilteredJobs: IJob[];
  draftJobs: IJob[];

  // Available jobs variables
  availableJobs: IJob[];
  totalJobs: number;

  // Inactive jobs variables
  inactiveJobs: IJob[];

  // Booleans to hide and show buttons
  addJobTrue: boolean = false;
  editJobTrue: boolean = false;
  editDraft: boolean = false;


  saveAsDraft: boolean = false;
  postJobBtn: boolean = false;
  unPostJobBtn: boolean = false;

  // Current-Selected values
  currentJob:IJob
  currentCompany: ICompany;
  currentJobId: number;
  currentJobType: string = '';
  currentJobCategory: string = '';
  selectedJobType: string = 'Default';
  selectedJobCategory: string = 'Default';
  selectedJobStatus: string = 'Default';
  createdJob: IJobInsert;
  categories: IJobCategory[];
  types: IJobType[];
  allStatus: IJobStatus[];
  closeResult: string;
  updatedJob: IJob;

  searchBarInput: string;
  sortBy: string;

  jobLoaded: Promise<boolean>;

  constructor(
    private jobService: JobService,
    private jobCategoryService: JobCategoryService,
    private jobTypeService: JobTypeService,
    private companyService: CompanyService,
    private jobStatusService: JobStatusService,
    private pagination: PaginationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    // load jobs
    this.refreshData();

    // Dummy company values
    var dummyCompId = 1;

    // Get the jobs available for the company that us being managed.
    this.companyService.getCompanyById(dummyCompId)
      .subscribe((data: ICompany) => {
        this.currentCompany = data['Data'];
      });

    this.categorySubscription.add(
      this.jobCategoryService.showCategories()
        .subscribe((data: IJobCategory[]) => {
          this.categories = data['Data'];
        }));

    this.jobTypeService.showTypes()
      .subscribe((data: IJobType[]) => {
        this.types = data['Data']
      });

    this.jobStatusService.showAllStatus()
      .subscribe((data: IJobStatus[]) => {
        this.allStatus = data['Data']
      });

    this.jobInfoForm = this.formBuilder.group({
      jobName: ['', Validators.required],
      jobCompany: '',
      jobCity: '',
      jobCountry: '',
      jobCategory: '',
      jobType: '',
      jobStatus: '',
      jobDescription: ['', Validators.maxLength(500)],
      addCategoryInput: '',
      addTypeInput: ''
    });

    this.addDropdownOptForm = this.formBuilder.group({
      input: ''
    });
  }

  // test 
  openEditModal(content, job){

    this.setCurrentJob(job).then( result => {
      this.openModal(content);
    })
  }

  setCurrentJob(job):Promise<any> {
    this.currentJob = job
    return Promise.resolve()
  }


  openModal(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {

      (this.closeResult = `Closed with: ${result}`)
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.setEditJob(false);
      this.setAddJob(false);
      this.editDraft = false;
      this.jobInfoForm.reset();
    });
  }

  setAddJob(value:boolean){
    this.addJobTrue = value;
  }

  setEditJob(value:boolean) {
    this.editJobTrue = value;
  }

  universalSearch() {
    if (this.searchBarInput != undefined) {
      this.refreshData();
    }
  }

  loadPage(page: number) {

    this.activePageNumber = page

    // this.pagination.pageNumber = page
    if (this.searchBarInput === undefined) {
      this.jobService.universalSearch('_', page, this.pagination.pageSize)
        .subscribe((data: IJob[]) => {
          this.availableJobs = data['Data'];
          this.sortedData = this.availableJobs
        });
    }
    else {
      this.jobService.universalSearch(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJob[]) => {
          this.availableJobs = data['Data'];
          this.sortedData = this.availableJobs
        });
    }
  }

  loadPageInactive(page: number) {

    this.inactivePageNumber = page

    if (this.searchBarInput === undefined) {
      this.jobService.universalSearchInactive('_', page, this.pagination.pageSize)
        .subscribe((data: IJob[]) => {
          this.inactiveJobs = data['Data'];
          this.sortedInactive = this.inactiveJobs
        });
    }
    else {
      this.jobService.universalSearchInactive(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJob[]) => {
          this.inactiveJobs = data['Data'];
          this.sortedInactive = this.inactiveJobs
        });
    }
  }

  loadPageDrafts(page: number) {

    this.draftPageNumber = page

    if (this.searchBarInput === undefined) {
      this.jobService.universalSearchDrafts('_', page, this.pagination.pageSize)
        .subscribe((data: IJob[]) => {
          this.draftJobs = data['Data'];
          this.draftsFilteredJobs = this.draftJobs;
          this.sortedDrafts = this.draftJobs
        });
    }
    else {
      this.jobService.universalSearchDrafts(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJob[]) => {
          this.draftJobs = data['Data'];
          this.draftsFilteredJobs = this.draftJobs;
          this.sortedDrafts = this.draftJobs
        });
    }
  }

  openAddOption(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      (this.closeResult = `Closed with: ${result}`)
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  createJob(newJobForm) {

    this.createdJob = {
      jobName: newJobForm.jobName,
      companyId: this.currentCompany.id,
      jobCategory: newJobForm.jobCategory,
      jobType: newJobForm.jobType,
      jobDescription: newJobForm.jobDescription,
      jobStatus: newJobForm.jobStatus
    }

    this.jobService.addJobMaintenance(this.createdJob)
      .subscribe(data => {
        this.refreshData();
        this.jobInfoForm.reset();
       }, error => { console.error("Error: ", error) })
  }

  createDraft(newJobForm) {

    this.createdJob = {
      jobName: newJobForm.jobName,
      companyId: this.currentCompany.id,
      jobCategory: newJobForm.jobCategory,
      jobType: newJobForm.jobType,
      jobDescription: newJobForm.jobDescription,
      jobStatus: newJobForm.jobStatus
    }

    this.jobService.addDraft(this.createdJob)
      .subscribe(data => { 
      this.refreshData();
      this.jobInfoForm.reset();}, 
      error => { console.error("Error: ", error) });
  }

  setJobActive(id) {

    this.jobService.setActiveJob(id)
      .subscribe(
        data => { this.refreshData();}, 
        error => { console.log("Error", error) }
      );
  }

  setJobInactive(id) {

    this.jobService.setInactiveJob(id)
      .subscribe(
        data => { this.refreshData();},
        error => { console.log("Error", error) });
  }

  deleteDraft(id) {
    this.jobService.deleteDraft(id).subscribe(
      data => { this.refreshData(); }, 
      error => { console.log("Error", error) });
  }

  postDraft() {
    this.jobService.setActiveJob(this.jobService.currentJobId)
      .subscribe(
        data => { this.refreshData();}, 
        error => { console.log("Error", error) });
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

  selectJobCatChangeHandler(event: any) {
    //update the ui
    this.selectedJobCategory = event.target.value;
  }


  selectJobStatChangeHandler(event: any) {
    this.selectedJobStatus = event.target.value;
  }

  updateJob(updatedJobForm) {
    this.createUpdatedJob(updatedJobForm).then( date => {
      this.jobService.updateJob(this.updatedJob)
      .subscribe(data => { this.refreshData() },
        error => { console.error("Error: ", error) })
    })
  }

  createUpdatedJob(updatedJobForm):Promise<any> {
    this.updatedJob = {
      jobId: this.jobService.currentJobId,
      jobName: updatedJobForm.jobName,
      jobCategory: updatedJobForm.jobCategory,
      jobType: updatedJobForm.jobType,
      jobStatus: updatedJobForm.jobStatus,
      jobDescription: updatedJobForm.jobDescription
    }

    return Promise.resolve()
  }

  draftUpdate: IJob

  updateJobDraft(updatedJobDraft) {

    this.draftUpdate = {
      jobId: this.jobService.currentJobId,
      jobName: updatedJobDraft.draftName,
      jobCategory: updatedJobDraft.draftCategory,
      jobType: updatedJobDraft.draftType,
      jobStatus: 'Draft',
      jobDescription: updatedJobDraft.draftDescription
    }

    this.jobService.updateJob(this.draftUpdate)
      .subscribe(data => { this.refreshData()},
        error => { console.error("Error: ", error) });
  }



  refreshData() {

    if (this.searchBarInput === undefined || this.searchBarInput === '') {
      // load active jobs
      this.jobTotalSubscription.add(
        this.jobService.universalSearchCount('_',
          this.pagination.pageNumber, this.pagination.pageSize)
          .subscribe((data: number) => {
            this.totalJobs = data['Data'][0]
            this.pagination.setPageRange(this.totalJobs)
            this.activePaginatorSize = this.pagination.paginatorSize
            this.activeCollectionSize = this.pagination.getCollectionSize()
          }));
      this.jobSubscription.add(
        this.jobService.universalSearch('_', this.pagination.pageNumber, this.pagination.pageSize)
          .subscribe((data: IJob[]) => {
            this.availableJobs = data['Data'];
            // this.filteredJobs = this.availableJobs;
            this.sortedData = this.availableJobs.slice();
            this.jobLoaded = Promise.resolve(true);
          }));

      // load inactive jobs
      this.jobInactiveTotalSubscription.add(
        this.jobService.universalSearchCountInactive('_',
          this.pagination.pageNumber, this.pagination.pageSize)
          .subscribe((data: number) => {
            this.totalInactiveJobs = data['Data'][0]
            this.pagination.setPageRange(this.totalInactiveJobs)
            this.inactivePaginatorSize = this.pagination.paginatorSize
            this.inactiveCollectionSize = this.pagination.getCollectionSize()
          }));

      this.jobInactiveSubscription.add(
        this.jobService.universalSearchInactive('_', this.pagination.pageNumber, this.pagination.pageSize)
          .subscribe((data: IJob[]) => {
            this.inactiveJobs = data['Data'];
            this.sortedInactive = this.inactiveJobs.slice();
            this.jobLoaded = Promise.resolve(true);
          }));

      // load drafts
      this.draftTotalSubscription.add(
        this.jobService.universalSearchCountDrafts()
          .subscribe((data: number) => {
            this.totalDrafts = data['Data'][0]
            this.pagination.setPageRange(this.totalDrafts)
            this.draftPaginatorSize = this.pagination.paginatorSize
            this.draftsCollectionSize = this.pagination.getCollectionSize()
          }));

      this.draftSubscription.add(
        this.jobService.universalSearchDrafts('_', this.pagination.pageNumber, this.pagination.pageSize)
          .subscribe((data: IJob[]) => {
            this.draftJobs = data['Data'];
            // this.draftsFilteredJobs = this.draftJobs;
            this.sortedDrafts = this.draftJobs.slice();
            this.jobLoaded = Promise.resolve(true);
          }));

    }
    else {
      // load active jobs
      this.jobService.universalSearchCount(this.searchBarInput,
        this.pagination.pageNumber, this.pagination.pageSize)
        .subscribe((data: number) => {
          this.totalJobs = data['Data'][0]
          this.pagination.setPageRange(this.totalJobs)
          this.activePaginatorSize = this.pagination.paginatorSize
          this.activeCollectionSize = this.pagination.getCollectionSize()
        });

      // load job count
      this.jobService.universalSearch(this.searchBarInput, this.pagination.pageNumber,
        this.pagination.pageSize).subscribe((data: IJob[]) => {
          this.availableJobs = data['Data'];
          this.sortedData = this.availableJobs.slice();
          this.jobLoaded = Promise.resolve(true);
        });

      // load inactive jobs
      this.jobService.universalSearchCountInactive(this.searchBarInput,
        this.pagination.pageNumber, this.pagination.pageSize)
        .subscribe((data: number) => {
          this.totalInactiveJobs = data['Data'][0]
          this.pagination.setPageRange(this.totalInactiveJobs)
          this.inactivePaginatorSize = this.pagination.paginatorSize
          this.inactiveCollectionSize = this.pagination.getCollectionSize()
        });

      // load inactive job count
      this.jobService.universalSearchInactive(this.searchBarInput, this.pagination.pageNumber, this.pagination.pageSize)
        .subscribe((data: IJob[]) => {
          this.inactiveJobs = data['Data'];
          this.sortedInactive = this.inactiveJobs.slice();
          this.jobLoaded = Promise.resolve(true);
        });

      // load drafts
      this.jobService.universalSearchCountDrafts()
        .subscribe((data: number) => {
          this.totalDrafts = data['Data'][0]
          this.pagination.setPageRange(this.totalInactiveJobs)
          this.draftPaginatorSize = this.pagination.paginatorSize
          this.draftsCollectionSize = this.pagination.getCollectionSize()
        });

      // load draft job count
      this.jobService.universalSearchDrafts(this.searchBarInput, this.pagination.pageNumber, this.pagination.pageSize)
        .subscribe((data: IJob[]) => {
          this.draftJobs = data['Data'];
          this.draftsFilteredJobs = this.draftJobs;
          this.sortedDrafts = this.draftJobs.slice();
          this.jobLoaded = Promise.resolve(true);
        });
    }
  }

  ngOnDestroy() {
    this.jobSubscription.unsubscribe();
    this.jobTotalSubscription.unsubscribe();
    this.jobInactiveSubscription.unsubscribe();
    this.jobInactiveTotalSubscription.unsubscribe();
    this.draftSubscription.unsubscribe();
    this.draftTotalSubscription.unsubscribe();
  }

  /// Sorting
  sortedData: IJob[];
  sortedDrafts: IJob[];
  sortedInactive: IJob[];

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

  addItem(event) {

    var key = event.target.id
    if (key === 'addCatBtn')
      this.addCatTrue = true;
    if (key === 'addTypeBtn')
      this.addTypeTrue = true;
  }

  cancelAddItem(event) {

    var key = event.target.id
    if (key === 'cancelAddCatBtn')
      this.addCatTrue = false;
    if (key === 'cancelAddTypeBtn')
      this.addTypeTrue = false;
  }

  newCategory: IJobCategory
  newType: IJobType
  changeDectector: ChangeDetectorRef


  /// Must make the dropdown refresh.
  addCategory() {
    this.newCategory = {
      name: this.jobInfoForm.controls.addCategoryInput.value,
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

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}