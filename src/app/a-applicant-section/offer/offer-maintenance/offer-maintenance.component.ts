import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { JobService } from '../../../shared/services/job.service';
import { IJob } from '../../../shared/models/job.model';
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





@Component({
  selector: 'app-offer-maintenance',
  templateUrl: './offer-maintenance.component.html',
  //styleUrls: ['./offer-maintenance.component.css']
})
export class OfferMaintenanceComponent implements OnInit {

  _listFilter: string;
  filteredJobs: IJobOffer[]

  selectedFilter: string = 'All Jobs';

  selectDropdownChangeHandler(event: any) {
    //update the ui
    this.selectedFilter = event.target.value;
  }

  get listFilter(): string {
    return this._listFilter;

  }

  set listFilter(value: string) {

    this._listFilter = value;
    this.filteredJobs = this.listFilter ? this.performFilter(this.listFilter) : this.availableJobs;
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

  inactiveFilteredJobs: IJobOffer[]
  _listInactiveFilter: string;

  get listInactiveFilter(): string {
    return this._listInactiveFilter;

  }

  set listInactiveFilter(value: string) {

    this._listInactiveFilter = value;
    this.inactiveFilteredJobs = this.listInactiveFilter ? this.performInactiveFilter(this.listInactiveFilter) : this.inactiveJobs;
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



  currentCompany: ICompany
  selectedJobType: string = 'Default'
  selectedJobCategory: string = 'Default'
  createdJob: IJobInsert

  availableJobs: IJobOffer[]
  inactiveJobs: IJobOffer[]
  draftJobs: IJobOffer[]
  job: IJob

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
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit() {

    this.companyService.getCompanyById(1)
      .subscribe((data: ICompany) => {
        this.currentCompany = data['Data'];
      })

    this.jobService.showAvalaibleJobs()
      .subscribe((data: IJobOffer[]) => {
        this.availableJobs = data['Data'];
        this.filteredJobs = this.availableJobs;

      })


    this.jobService.showPastJobs()
      .subscribe((data: IJobOffer[]) => {
        this.inactiveJobs = data['Data'];
        this.inactiveFilteredJobs = this.inactiveJobs

      })

    this.jobService.showDraftJobs()
      .subscribe((data: IJobOffer[]) => {
        this.draftJobs = data['Data']
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

  }

  openEdit(content, job) {

    this.jobEditForm.get('name').setValue(job.jobName)
    this.jobEditForm.controls['category'].setValue(job.jobCategory, { onlySelf: true })
    this.jobEditForm.controls['type'].setValue(job.jobType, { onlySelf: true })
    this.jobEditForm.get('description').setValue(job.description)


    console.log(job.jobId)

    this.jobService.setCurrentJobId(job.jobId)

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size:'lg'}).result.then((result) => {


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

  openAddJob(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-add', size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  createJob(newJobForm) {

    this.createdJob = {
      jobName: newJobForm.jobName,
      companyId: this.currentCompany.id,
      jobCategory: newJobForm.jobCategory,
      jobType: newJobForm.jobType,
      jobDescription: newJobForm.jobDescription

    }
    //console.log(this.createdJob)
    this.jobService.addJobMaintenance(this.createdJob)
      .subscribe(data => { console.log("POST:" + data) },
        error => { console.error("Error: ", error) })
  }


  setJobActive(id) {

    this.jobService.setActiveJob(id)
      .subscribe(
        data => { console.log("UPDATED: ", data) },
        error => { console.log("Error", error) }
      );

    this.jobService.showAvalaibleJobs()
      .subscribe((data: IJobOffer[]) => {
        this.availableJobs = data['Data'];
        this.filteredJobs = this.availableJobs;

      })


    this.jobService.showPastJobs()
      .subscribe((data: IJobOffer[]) => {
        this.inactiveJobs = data['Data'];
        this.inactiveFilteredJobs = this.inactiveJobs

      })


  }

  setJobInactive(id) {

    this.jobService.setInactiveJob(id)
      .subscribe(
        data => { console.log("UPDATED: ", data) },
        error => { console.log("Error", error) }
      );

    this.jobService.showAvalaibleJobs()
      .subscribe((data: IJobOffer[]) => {
        this.availableJobs = data['Data'];
        this.filteredJobs = this.availableJobs;

      })

    this.jobService.showPastJobs()
      .subscribe((data: IJobOffer[]) => {
        this.inactiveJobs = data['Data'];
        this.inactiveFilteredJobs = this.inactiveJobs
      })
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


  updateJob(updatedJobForm, job) {

    console.log(this.jobService.currentJobId)

    this.updatedJob = {
      id: this.jobService.currentJobId,
      name: updatedJobForm.name,
      category: updatedJobForm.category,
      type: updatedJobForm.type,
      description: updatedJobForm.description
    }

    console.log(this.updatedJob)

    this.jobService.updateJob(this.updatedJob)
      .subscribe(data => { console.log("Updated:" + data) },
        error => { console.error("Error: ", error) })

  
  }

  


}
