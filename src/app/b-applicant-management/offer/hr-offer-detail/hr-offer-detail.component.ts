import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IJobOffer } from '../../../shared/models/job-offer.model';
import { JobService } from '../../../shared/services/job.service';
import { IJob } from '../../../shared/models/job.model';
import { IOfferHrEdit } from '../../../shared/models/hr-offer-edit.model'
import { IApplicationStatus } from '../../../shared/models/application_status.model';
import { ApplicantService } from '../../../shared/services/applicant.service';
import { IEmployeeFromCompany } from '../../../shared/models/IEmployeeFromCompany';
import { EmployeeService } from '../../../shared/services/employee.service';
import { ApplicationService } from '../../../shared/services/application.service';
import { FormGroup, FormControl } from '@angular/forms';
import { IJobOfferHR } from '../../../shared/models/job-offer-hr.model';
import 'jquery'
import { Sort } from '@angular/material';
import { PaginationService } from '../../../shared/services/pagination.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-hr-offer-detail',
  templateUrl: './hr-offer-detail.component.html',
  //styleUrls: ['./hr-offer-detail.component.css']
})
export class HrOfferDetailComponent implements OnInit {

  job: IJobOfferHR
  selectedJob: IJobOfferHR

  applicants: IOfferHrEdit[]
  applicationStatus: IApplicationStatus[]
  //status:IApplicationStatus
  employees: IEmployeeFromCompany[]
  // applicationStatusOption:FormControl
  // recruiterOption:FormControl
  // selectedOptions:FormGroup
  totalApplicants: number


  searchBarInput: string
  pageSize: number
  paginatorSize: number
  paginatorCollectionSize: number
  page: number = this.pagination.pageNumber;

  currentJob: IOfferHrEdit
  closeResult: string;
  selectedRecruiter
  selectedApplicationStatus

  constructor(private jobService: JobService, private router: Router
    , private applicantService: ApplicantService, private employeeService: EmployeeService
    , private applicationService: ApplicationService, private pagination: PaginationService
    ,private modalService: NgbModal) { }

  ngOnInit() {

    this.pageSize = this.pagination.pageSize
    this.page = this.pagination.pageNumber = 1
    this.paginatorSize = this.pagination.paginatorSize


    this.loadPage

    this.currentJob = this.jobService.currentJob

    setTimeout(() => { this.refreshData() }, 100);

    console.log(this.pageSize)
    console.log(this.page)
  }
  openEdit(content, job) {

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


  save(applicationId, status, recruiter) {

    var value = document.getElementById("sel1op1").nodeValue;
    // console.log(value)

    //this.applicationService.updateApplicationStatus()


  }

  // getSelectedEmployee(employeeId, applicationemployeeId) {
  //   this.selectedRecruiter = this.employees.filter(
  //     employee => employeeId = applicationemployeeId);
  // }

  // onEmployeeChange(event) {}

  loadPage(page: number) {

    this.pagination.pageNumber = page

    this.applicantService.offerDetailGetApplicants(this.currentJob.jobId, page, this.pageSize)
      .subscribe((data: IOfferHrEdit[]) => {
        this.applicants = data['Data'];
        // this.sortedData = this.applicants.slice()
      })

  }

  refreshData() {
    this.jobService.showJobOfferDetail(this.currentJob.jobId)
      .subscribe((data: IJobOfferHR) => {
        this.job = data['Data'][0];
      })

    this.applicationService.getAllApplicationStatus()
      .subscribe((data: IApplicationStatus[]) => {
        this.applicationStatus = data['Data'];
      })

    this.applicantService.offerDetailTotalApplicants(this.jobService.currentJob.jobId)
      .subscribe((data: number) => {
        this.totalApplicants = data['Data'][0]
        this.pagination.setPageRange(this.totalApplicants)
        this.paginatorCollectionSize = this.pagination.getCollectionSize()
      })

    this.applicantService.offerDetailGetApplicants(this.jobService.currentJob.jobId, this.page, this.pageSize)
      .subscribe((data: IOfferHrEdit[]) => {
        this.applicants = data['Data'];
        this.sortedData = this.applicants.slice()
      })



    // this.jobEditForm.controls['category'].setValue(job.jobCategory, {onlySelf: true})
    // this.jobEditForm.controls['type'].setValue(job.jobType, {onlySelf: true})

    this.employeeService.getActiveCompanyEmployees(this.jobService.currentJob.jobId)
      .subscribe((data: IEmployeeFromCompany[]) => {
        this.employees = data['Data'];
      })
  }

  /// Sorting
  sortedData: IOfferHrEdit[]

  sortData(sort: Sort) {

    const data = this.applicants.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;

      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'applicantId': return compare(a.applicantId, b.applicantId, isAsc);
        case 'applicantName': return compare(a.applicantFirstName, b.applicantFirstName, isAsc);
        case 'status': return compare(a.applicationStatus, b.applicationStatus, isAsc);
        case 'recruiter': return compare(a.employeeFirstName, b.employeeFirstName, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
