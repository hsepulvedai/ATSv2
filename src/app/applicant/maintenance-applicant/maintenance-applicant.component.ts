import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { IApplicant } from '../../shared/models/applicant.model'
import { ApplicantService } from '../../shared/services/applicant.service';

@Component({
  selector: 'app-maintenance-applicant',
  templateUrl: './maintenance-applicant.component.html',
  //styleUrls: ['./maintenance-applicant.component.css']
})
export class MaintenanceApplicantComponent implements OnInit {
  allApplicants: IApplicant[]

  constructor(
      private router: Router,
      private applicantService: ApplicantService
      //, private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
      this.applicantService.getAllApplicants()
          .subscribe((data:IApplicant[]) => {
              this.allApplicants = data['Data'];
          })
  }

  // goToProfile(employeeId) {  
  //     this.employeeService.getEmployee(employeeId)
  //         .subscribe((data:IEmployee) => {
  //             this.employee = data['Data'];
  //             this.employeeService.currentEmployee = this.employee
  //             this.router.navigate(['employeeForm'])
  //         })
  // }

}
