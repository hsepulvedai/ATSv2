import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from '../../../shared/services/job.service';
import { IJobOffer } from '../../../shared/models/job-offer.model';
import { IJobCategory } from '../../../shared/models/job_category.model';
import { JobCategoryService } from '../../../shared/services/job-category.service';
import { IJobType } from '../../../shared/models/job_type.model';
import { JobTypeService } from '../../../shared/services/job-type.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from '../../../shared/services/company.service';
import { ICompany } from '../../../shared/models/company.model';
import { IJobInsert } from '../../../shared/models/job_insert.model';
import { IJobUpdate } from '../../../shared/models/job_update.model';
import { PaginationService } from '../../../shared/services/pagination.service';
import 'jquery'


@Component({
  selector: 'app-offer-maintenance',
  templateUrl: './offer-maintenance.component.html',
  styleUrls: ['./offer-maintenance.component.css']
})
export class OfferMaintenanceComponent implements OnInit {

  pageSize: number = this.pagination.pageSize

  activePageNumber: number = this.pagination.pageNumber
  inactivePageNumber: number = this.pagination.pageNumber
  draftPageNumber: number = this.pagination.pageNumber

  activeCollectionSize: number
  inactiveCollectionSize: number
  draftsCollectionSize: number


  activePaginatorSize: number
  inactivePaginatorSize: number
  draftPaginatorSize: number

  draftEditForm: FormGroup
  draftName: FormControl
  draftCategory: FormControl
  draftType: FormControl
  draftDescription: FormControl

  searchButtonClicked: boolean = false
  //page: number = this.pagination.pageNumber;
  totalJobs: number
  paginatorCollectionSize: number

  searchBarInput: string
  sortBy: string

// @Input() set(jobs: IJobOffer[]) {
//   this.availableJobs = []
// }

  availableJobs: IJobOffer[]


  job: IJobOffer

  searchForm: FormGroup
  search: FormControl
  filter: FormControl

  _listFilter: string;
  filteredJobs: IJobOffer[]

  selectedFilter: string = 'All Jobs';
  selectedSort

  searchButtonClickedInactive: boolean = false
  pageInactive: number = this.pagination.pageNumber;
  paginatorSizeInactive: number
  totalInactiveJobs: number
  paginatorCollectionSizeInactive: number

  searchBarInputInactive: string
  sortByInactive: string

  searchBarInputDrafts: string
  totalDrafts: number
  draftsFilteredJobs: IJobOffer[]
  draftJobs: IJobOffer[]

  // _listDraftFilter: string;

  inactiveFilteredJobs: IJobOffer[]
  _listInactiveFilter: string;

  changeTab(event) {
    console.log(event.title)
    console.log('yes')
  }

  ngOnInit() {

    this.companyService.getCompanyById(1)
      .subscribe((data: ICompany) => {
        this.currentCompany = data['Data'];
      })

    // load active jobs
    this.jobService.universalSearchCount('_',
      this.pagination.pageNumber, this.pagination.pageSize)
      .subscribe((data: number) => {
        this.totalJobs = data['Data'][0]
        this.pagination.setPageRange(this.totalJobs)
        this.activePaginatorSize = this.pagination.paginatorSize
        this.activeCollectionSize = this.pagination.getCollectionSize()
      })

    this.jobService.universalSearch('_', this.pagination.pageNumber, this.pagination.pageSize)
      .subscribe((data: IJobOffer[]) => {
        this.availableJobs = data['Data'];
        this.filteredJobs = this.availableJobs;
      })

    // load inactive jobs
    this.jobService.universalSearchCountInactive('_',
      this.pagination.pageNumber, this.pagination.pageSize)
      .subscribe((data: number) => {
        this.totalInactiveJobs = data['Data'][0]
        this.pagination.setPageRange(this.totalInactiveJobs)
        this.inactivePaginatorSize = this.pagination.paginatorSize
        this.inactiveCollectionSize = this.pagination.getCollectionSize()
      })

    this.jobService.universalSearchInactive('_', this.pagination.pageNumber, this.pagination.pageSize)
      .subscribe((data: IJobOffer[]) => {
        this.inactiveJobs = data['Data'];
        this.inactiveFilteredJobs = this.inactiveJobs;
      })

      // load drafts
      this.jobService.universalSearchCountDrafts()
      .subscribe((data: number) => {
        this.totalDrafts = data['Data'][0]
        this.pagination.setPageRange(this.totalInactiveJobs)
        this.draftPaginatorSize = this.pagination.paginatorSize
        this.draftsCollectionSize = this.pagination.getCollectionSize()
      })

    this.jobService.universalSearchDrafts('_', this.pagination.pageNumber, this.pagination.pageSize)
      .subscribe((data: IJobOffer[]) => {
        this.draftJobs = data['Data'];
        this.draftsFilteredJobs = this.draftJobs;
      })

    this.jobCategoryService.showCategories()
      .subscribe((data: IJobCategory[]) => {
        this.categories = data['Data'];
      })

    this.jobTypeService.showTypes()
      .subscribe((data: IJobType[]) => {
        this.types = data['Data']
      })

    // These are the controls for the edit job form.
    this.name = new FormControl(),
      this.category = new FormControl(),
      this.type = new FormControl(),
      this.description = new FormControl()


    // These are the controls for the add job form.
    this.jobName = new FormControl()
    this.jobCompany = new FormControl()
    this.jobCity = new FormControl()
    this.jobCountry = new FormControl()
    this.jobCategory = new FormControl()
    this.jobType = new FormControl()
    this.jobDescription = new FormControl()

    // These are the form controls for the draft edit form.
    this.draftName = new FormControl()
    this.draftCategory = new FormControl()
    this.draftType = new FormControl()
    this.draftDescription = new FormControl()

    this.newJobForm = new FormGroup({
      jobName: this.jobName,
      jobCompany: this.jobCompany,
      jobCity: this.jobCity,
      jobCountry: this.jobCountry,
      jobCategory: this.jobCategory,
      jobType: this.jobType,
      jobDescription: this.jobDescription,
    })

    this.jobEditForm = new FormGroup({
      name: this.name,
      category: this.category,
      type: this.type,
      description: this.description
    })

    this.draftEditForm = new FormGroup({
      draftName: this.draftName,
      draftCategory: this.draftCategory,
      draftType: this.draftType,
      draftDescription: this.draftDescription
    })

  }

  selectDropdownChangeHandler(event: any) {
    //update the ui
    this.selectedFilter = event.target.value;
  }

  sortParamDropdownChangeHandler(event: any) {
    //update the ui
    this.sortBy = event.target.value;
  }


  universalSearch() {

    if (this.searchBarInput != undefined) {
      // this.loadActiveJobs()
      // this.loadInactiveJobs()
    }
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredJobs = this.listFilter ? this.performFilter(this.listFilter) : this.availableJobs;
    this.inactiveFilteredJobs = this.listFilter ? this.performFilter(this.listFilter) : this.inactiveJobs;
  }

  performFilter(filterBy: string): IJobOffer[] {
    filterBy = filterBy.toLocaleLowerCase();


    if (this.selectedFilter === 'Job Title')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.jobName.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Company')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.company.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Location/City')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.city.toLocaleLowerCase().indexOf(filterBy) !== -1)

    else if (this.selectedFilter === 'Location/Country')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.country.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Category')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.jobCategory.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Type')
      return this.availableJobs.filter((job: IJobOffer) =>
        job.jobType.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'All Jobs')
      // Universal search (if no filter selected default all jobs) 
      return this.availableJobs.filter((job: IJobOffer) => {
        return job.company.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.city.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.jobName.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.jobType.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.country.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.jobCategory.toLocaleLowerCase().indexOf(filterBy) !== -1

      })

  }

  loadPage(page: number) {
    if (this.searchBarInput === undefined) {
      this.jobService.universalSearch('_', page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.availableJobs = data['Data'];
          this.filteredJobs = this.availableJobs;
        })
    }
    else {
      this.jobService.universalSearch(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.availableJobs = data['Data'];
          this.filteredJobs = this.availableJobs;
        })
    }

  }

  loadPageInactive(page: number) {
    if (this.searchBarInput === undefined) {
      this.jobService.universalSearchInactive('_', page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.inactiveJobs = data['Data'];
          this.inactiveFilteredJobs = this.inactiveJobs;
        })
    }
    else {
      this.jobService.universalSearchInactive(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.inactiveJobs = data['Data'];
          this.inactiveFilteredJobs = this.inactiveJobs;
        })
    }
  }

  loadPageDrafts(page: number) {
    if (this.searchBarInput === undefined) {
      this.jobService.universalSearchDrafts('_', page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.draftJobs = data['Data'];
          this.draftsFilteredJobs = this.draftJobs;
        })
    }
    else {
      this.jobService.universalSearchDrafts(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.draftJobs = data['Data'];
          this.draftsFilteredJobs = this.draftJobs;
        })
    }
  }

  get listInactiveFilter(): string {
    return this._listInactiveFilter;
  }

  set listInactiveFilter(value: string) {

    this._listInactiveFilter = value;
    this.inactiveFilteredJobs = this.listInactiveFilter ?
      this.performInactiveFilter(this.listInactiveFilter) : this.inactiveJobs;
  }

  performInactiveFilter(filterBy: string): IJobOffer[] {
    filterBy = filterBy.toLocaleLowerCase();


    if (this.selectedFilter === 'Job Title')
      return this.inactiveJobs.filter((job: IJobOffer) =>
        job.jobName.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Company')
      return this.inactiveJobs.filter((job: IJobOffer) =>
        job.company.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Location/City')
      return this.inactiveJobs.filter((job: IJobOffer) =>
        job.city.toLocaleLowerCase().indexOf(filterBy) !== -1)

    else if (this.selectedFilter === 'Location/Country')
      return this.inactiveJobs.filter((job: IJobOffer) =>
        job.country.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Category')
      return this.inactiveJobs.filter((job: IJobOffer) =>
        job.jobCategory.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Type')
      return this.inactiveJobs.filter((job: IJobOffer) =>
        job.jobType.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'All Jobs')
      // Universal search (if no filter selected default all jobs) 
      return this.inactiveJobs.filter((job: IJobOffer) => {
        return job.company.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.city.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.jobName.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.jobType.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.country.toLocaleLowerCase().indexOf(filterBy) !== -1
          || job.jobCategory.toLocaleLowerCase().indexOf(filterBy) !== -1
      })
  }

  universalSearchInactive() {

    // if (this.searchBarInputInactive != undefined)
    // this.loadActiveJobs()
    // this.loadInactiveJobs()

  }


  currentCompany: ICompany
  selectedJobType: string = 'Default'
  selectedJobCategory: string = 'Default'
  createdJob: IJobInsert

  inactiveJobs: IJobOffer[]

  currentJobId: number

  categories: IJobCategory[]

  types: IJobType[]

  closeResult: string;

  newJobForm: FormGroup
  jobName: FormControl
  jobCompany: FormControl
  jobCity: FormControl
  jobCountry: FormControl
  jobCategory: FormControl
  jobType: FormControl
  jobDescription: FormControl

  jobEditForm: FormGroup
  name: FormControl
  category: FormControl
  type: FormControl
  description: FormControl

  currentJobType: string = ''
  currentJobCategory: string = ''


  updatedJob: IJobUpdate


  constructor(private router: Router,
    private jobService: JobService,
    private jobCategoryService: JobCategoryService,
    private jobTypeService: JobTypeService,
    private companyService: CompanyService,
    private pagination: PaginationService,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }



  openEdit(content, job) {

    this.jobEditForm.get('name').setValue(job.jobName)
    this.jobEditForm.controls['category'].setValue(job.jobCategory, { onlySelf: true })
    this.jobEditForm.controls['type'].setValue(job.jobType, { onlySelf: true })
    this.jobEditForm.get('description').setValue(job.description)

    this.jobService.setCurrentJobId(job.jobId)

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {


      (this.closeResult = `Closed with: ${result}`)
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  openDraftEdit(content, job) {

    this.draftEditForm.get('draftName').setValue(job.jobName)
    this.draftEditForm.controls['draftCategory'].setValue(job.jobCategory, { onlySelf: true })
    this.draftEditForm.controls['draftType'].setValue(job.jobType, { onlySelf: true })
    this.draftEditForm.get('draftDescription').setValue(job.description)


    this.jobService.setCurrentJobId(job.jobId)

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {


      (this.closeResult = `Closed with: ${result}`)
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  openAddJob(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-add', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
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
      jobDescription: newJobForm.jobDescription

    }

    this.jobService.addJobMaintenance(this.createdJob)
      .subscribe(data => { console.log("POST:" + data) },
        error => { console.error("Error: ", error) })

    // this.loadActiveJobs('_', 1, this.pagination.pageSize)
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

    // this.loadDrafts('_', 1, this.pagination.pageSize)
  }

  setJobActive(id) {

    this.jobService.setActiveJob(id)
      .subscribe(
        data => { console.log("UPDATED: ", data) },
        error => { console.log("Error", error) }
      );

    if (this.searchBarInput != undefined) {
      // this.loadActiveJobs(this.searchBarInput,
      // this.pagination.pageNumber, this.pagination.pageSize)
      // this.loadInactiveJobs()
    }
    else {
      // this.loadActiveJobs('_',
      // this.pagination.pageNumber, this.pagination.pageSize)
      // this.loadInactiveJobs()
    }
  }

  setJobInactive(id) {

    this.jobService.setInactiveJob(id)
      .subscribe(
        data => { console.log("UPDATED: ", data) },
        error => { console.log("Error", error) }
      )

  }

  deleteDraft() {
    this.jobService.deleteDraft(this.jobService.currentJobId).subscribe(
      data => { console.log("DELETED: ", data) },
      error => { console.log("Error", error) }
    );
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


  // TODO: Check this method
  updateJob(updatedJobForm) {

    this.updatedJob = {
      id: this.jobService.currentJobId,
      name: updatedJobForm.name,
      category: updatedJobForm.category,
      type: updatedJobForm.type,
      description: updatedJobForm.description
    }

    this.jobService.updateJob(this.updatedJob)
      .subscribe(data => { console.log("Updated:" + data) },
        error => { console.error("Error: ", error) })

    if (this.searchBarInput != undefined) {
      this.jobService.universalSearchCount('_',
        this.pagination.pageNumber, this.pagination.pageSize)
        .subscribe((data: number) => {
          this.totalJobs = data['Data'][0]
          this.pagination.setPageRange(this.totalJobs)
          this.activePaginatorSize = this.pagination.paginatorSize
          this.activeCollectionSize = this.pagination.getCollectionSize()
        })

      this.jobService.universalSearch('_', this.pagination.pageNumber, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.availableJobs = data['Data'];
          this.filteredJobs = this.availableJobs;
        })
    }
    else {
      this.jobService.universalSearchCount(this.searchBarInput,
        this.pagination.pageNumber, this.pagination.pageSize)
        .subscribe((data: number) => {
          this.totalJobs = data['Data'][0]
          this.pagination.setPageRange(this.totalJobs)
          this.activePaginatorSize = this.pagination.paginatorSize
          this.activeCollectionSize = this.pagination.getCollectionSize()
        })

      this.jobService.universalSearch(this.searchBarInput, this.pagination.pageNumber, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.availableJobs = data['Data'];
          this.filteredJobs = this.availableJobs;
        })
    }

  }

}
