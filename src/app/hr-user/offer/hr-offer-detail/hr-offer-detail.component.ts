/*This page shows every application for a specific job. It allows the HR 
  employee to edit the recruiter and the status of the specific application*/
import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../shared/services/job.service';
import { IOfferHrEdit } from '../../../shared/models/hr-offer-edit.model'
import { IApplicationStatus } from '../../../shared/models/application_status.model';
import { ApplicantService } from '../../../shared/services/applicant.service';
import { IEmployeeFromCompany } from '../../../shared/models/IEmployeeFromCompany';
import { EmployeeService } from '../../../shared/services/employee.service';
import { ApplicationService } from '../../../shared/services/application.service';
import { FormGroup, FormControl, FormControlDirective } from '@angular/forms';
import { IJobOfferHR } from '../../../shared/models/job-offer-hr.model';
import 'jquery'
import { Sort } from '@angular/material';
import { PaginationService } from '../../../shared/services/pagination.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IApplication } from '../../../shared/models/application.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-hr-offer-detail',
  templateUrl: './hr-offer-detail.component.html',
  styleUrls: ['./hr-offer-detail.component.css']
})
export class HrOfferDetailComponent implements OnInit {

  job: IJobOfferHR
  selectedJob: IJobOfferHR
  selectedApplicant: IOfferHrEdit

  // selectedRecruiter
  // selectedStatus

  currentApplicationId: number

  applicants: IOfferHrEdit[]
  applicationStatus: IApplicationStatus[]
  employees: IEmployeeFromCompany[]
  totalApplicants: number

  editForm: FormGroup
  recruiter: FormControl
  status: FormControl
  selectedApplicantName: FormControl

  searchBarInput: string
  pageSize: number
  paginatorSize: number
  paginatorCollectionSize: number
  page: number = this.pagination.pageNumber;

  currentJob: IOfferHrEdit
  closeResult: string;

  selectedApplicationStatus
  updatedInfo: IApplication

  selectedJobId

  constructor(
    private jobService: JobService,
    private applicantService: ApplicantService,
    private employeeService: EmployeeService,
    private applicationService: ApplicationService,
    private pagination: PaginationService,
    private modalService: NgbModal,
    private route: ActivatedRoute) { }

  ngOnInit() {

    const jobId = +this.route.snapshot.paramMap.get('id');
    this.jobService.showJobById(jobId).subscribe(data => {
      this.job = data['Data'][0]
      this.getApplicants(1);
      // this.getTotalApplicants()
    });

    this.loadData()

    this.pageSize = this.pagination.pageSize
    this.page = this.pagination.pageNumber = 1
    this.paginatorSize = this.pagination.paginatorSize

    this.recruiter = new FormControl()
    this.status = new FormControl()
    this.selectedApplicantName = new FormControl()

    this.editForm = new FormGroup({
      recruiter: this.recruiter,
      status: this.status,
      selectedApplicantName: this.selectedApplicantName
    })

  }
  openEdit(content, applicant) {

    this.currentApplicationId = applicant.applicationId

    this.editForm.get('selectedApplicantName').setValue(applicant.applicantFirstName + ' ' + applicant.applicantLastName)
    this.editForm.controls['recruiter'].setValue(applicant.employeeId, { onlySelf: true })
    this.editForm.controls['status'].setValue(applicant.applicationStatusId, { onlySelf: true })

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

  updateRecord(form) {

    this.updatedInfo = {
      id: this.currentApplicationId,
      employeeId: form.recruiter,
      applicationStatusId: form.status
    }

    this.modifyData();
  }

  modifyData(): Promise<any> {

    this.applicationService.modifyRecruiter(this.updatedInfo)
      .subscribe(data => { },
        error => { console.error("Error: ", error) })

    this.applicationService.modifyStatus(this.updatedInfo)
      .subscribe(data => { this.getApplicants(this.page) },
        error => { console.error("Error: ", error) })

    return Promise.resolve();
  }

  loadPage(page: number) {

    this.pagination.pageNumber = page

    this.getApplicants(page);
  }

  getApplicants(page) {
    this.applicantService.offerDetailGetApplicants(this.job.jobId, page, this.pageSize)
      .subscribe((data: IOfferHrEdit[]) => {
        this.sortedData = data['Data'];
        // this.sortedData = this.applicants;
        // this.applicants = data['Data'];
        // this.sortedData = this.applicants;
      });
  }

  getTotalApplicants() {
    this.applicantService.offerDetailTotalApplicants(this.job.jobId)
      .subscribe((data: number) => {
        this.totalApplicants = data['Data'][0]
        this.pagination.setPageRange(this.totalApplicants)
        this.paginatorCollectionSize = this.pagination.getCollectionSize()
      })
  }

  loadData() {

    this.applicationService.getAllApplicationStatus()
      .subscribe((data: IApplicationStatus[]) => {
        this.applicationStatus = data['Data'];
      })

    // Using Company 1 for test
    this.employeeService.getActiveCompanyEmployees(1)
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
        case 'applicantId': return compare(a.applicationId, b.applicationId, isAsc);
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
