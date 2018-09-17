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

@Component({
  selector: 'app-hr-offer-detail',
  templateUrl: './hr-offer-detail.component.html',
  //styleUrls: ['./hr-offer-detail.component.css']
})
export class HrOfferDetailComponent implements OnInit {

  job: IJobOfferHR
  selectedJob:IJobOfferHR

  applicants: IOfferHrEdit[]
  applicationStatus: IApplicationStatus[]
  //status:IApplicationStatus
  employees:IEmployeeFromCompany[]
  // applicationStatusOption:FormControl
  // recruiterOption:FormControl
  // selectedOptions:FormGroup

  selectedRecruiter
  selectedApplicationStatus

  constructor(private jobService: JobService, private router: Router
    , private applicantService: ApplicantService, private employeeService:EmployeeService
    , private applicationService:ApplicationService) { }

  ngOnInit() {
    
    this.jobService.showJobOfferDetail(this.jobService.currentJob.jobId)
      .subscribe((data: IJobOfferHR) => {
        this.job = data['Data'][0];
      })

      this.applicationService.getAllApplicationStatus()
      .subscribe((data: IApplicationStatus[]) => {
        this.applicationStatus = data['Data'];
      })

    this.applicantService.offerDetailGetApplicants(this.jobService.currentJob.jobId)
      .subscribe((data: IOfferHrEdit[]) => {
        this.applicants = data['Data'];
      })

      // this.jobEditForm.controls['category'].setValue(job.jobCategory, {onlySelf: true})
      // this.jobEditForm.controls['type'].setValue(job.jobType, {onlySelf: true})

      this.employeeService.getActiveCompanyEmployees(this.jobService.currentJob.jobId)
      .subscribe((data: IEmployeeFromCompany[]) => {
        this.employees = data['Data'];
      })
  }

  save(applicationId,status, recruiter) {
    // console.log("Application id: " + applicationId)
    // console.log("Status: " + status)
    // console.log("Recruiter: " + recruiter)
    
    var value = document.getElementById("sel1op1").nodeValue;
    console.log(value)

    //this.applicationService.updateApplicationStatus()
  }

  // getSelectedEmployee(employeeId, applicationemployeeId) {
  //   this.selectedRecruiter = this.employees.filter(
  //     employee => employeeId = applicationemployeeId);
  // }

  // onEmployeeChange(event) {}

}
