import { Component, OnInit, Input } from '@angular/core';
import { IJobOffer } from '../../../shared/models/job-offer.model';
import { JobService } from '../../../shared/services/job.service';
import { PaginationService } from '../../../shared/services/pagination.service';
import { Sort } from '@angular/material';

import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { ModalService } from '../../../shared/services/modal.service';



@Component({
  selector: 'offer-maintenance-table',
  templateUrl: './offer-maintenance-table.component.html',
  styleUrls: ['./offer-maintenance-table.component.css']
})
export class OfferMaintenanceTableComponent implements OnInit {

  // TODO: Fix so that every row has the buttons

  @Input()
  title:string

  @Input()
  totalJobs: number

  @Input()
  pageNumber:number

  @Input()
  paginatorSize:number

  @Input()
  jobs: IJobOffer[]

  @Input()
  collectionSize:number

  @Input()
  pageSize:number

  // @Input()
  searchBarInput:string

  constructor(
    private jobService:JobService, private pagination:PaginationService, private modalService:ModalService
  ) { }

  ngOnInit() {
    this.loadPage(this.pageNumber)
  }

  loadPage(page: number) {

    this.pageNumber = page

    // this.pagination.pageNumber = page
    if (this.searchBarInput === undefined) {


      if (this.title === 'Available Jobs')

      this.jobService.universalSearch('_', page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.jobs = data['Data'];
          this.sortedData = this.jobs
        })

        if (this.title === 'Past Jobs')
        this.jobService.universalSearchInactive('_', page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.jobs = data['Data'];
          this.sortedData = this.jobs
        })

        if (this.title === 'Drafts')
        this.jobService.universalSearchDrafts('_', page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.jobs = data['Data'];
          this.sortedData = this.jobs
        })
    }
    else {
      if (this.title === 'Available Jobs')

      this.jobService.universalSearch(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.jobs = data['Data'];
          this.sortedData = this.jobs
        })

        if (this.title === 'Past Jobs')
        this.jobService.universalSearchInactive(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.jobs = data['Data'];
          this.sortedData = this.jobs
        })

        if (this.title === 'Drafts')
        this.jobService.universalSearchDrafts(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IJobOffer[]) => {
          this.jobs = data['Data'];
          this.sortedData = this.jobs
        })
    }
  }

  setJobActive(id) {

    this.jobService.setActiveJob(id)
      .subscribe(
        data => { console.log("UPDATED: ", data) },
        error => { console.log("Error", error) }
      );

    setTimeout(() => { this.loadPage(this.pageNumber) }, 200)
  }

  setJobInactive(id) {

    this.jobService.setInactiveJob(id)
      .subscribe(
        data => { console.log("UPDATED: ", data) },
        error => { console.log("Error", error) }
      );

      setTimeout(() => { this.loadPage(this.pageNumber) }, 200)
  }

  deleteDraft(id) {
    this.jobService.deleteDraft(id).subscribe(
      data => { console.log("DELETED: ", data) },
      error => { console.log("Error", error) }
    );

    setTimeout(() => { this.loadPage(this.pageNumber) }, 200)

  }

  closeResult:string
  addJobTrue: boolean = false
  editJobTrue: boolean = false
  editDraftTrue: boolean = false
  jobInfoForm:FormGroup


  openModal(content, job, event) {

    // if (event.target.id === 'editJobButton' || event.target.id === 'editDraftBtn') {
    //   this.jobInfoForm.get('jobName').setValue(job.jobName)
    //   this.jobInfoForm.controls['jobStatus'].setValue(job.jobStatus, { onlySelf: true })
    //   this.jobInfoForm.controls['jobCategory'].setValue(job.jobCategory, { onlySelf: true })
    //   this.jobInfoForm.controls['jobType'].setValue(job.jobType, { onlySelf: true })
    //   this.jobInfoForm.get('jobDescription').setValue(job.description)
    //   this.jobService.setCurrentJobId(job.jobId)
    // }

    if (event.target.id === 'editJobButton')
      this.editJobTrue = true;

    if (event.target.id === 'addJobBtn')
      this.addJobTrue = true;

    if (event.target.id === 'editDraftBtn')
      this.editDraftTrue = true;

      this.modalService.openModal(content)

  }


  /// Sorting
  sortedData: IJobOffer[]
  sortedDrafts: IJobOffer[]
  sortedInactive: IJobOffer[]

  sortData(sort: Sort) {

    const aJobs = this.jobs.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedData = aJobs;
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
  }

}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}