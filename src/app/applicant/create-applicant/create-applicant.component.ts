import { Component, OnInit } from '@angular/core';
import { IApplicant } from '../../shared/models/applicant.model'
import { Router, ActivatedRoute } from '@angular/router'
import { ApplicantService } from '../../shared/services/applicant.service';
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'create-applicant',
  templateUrl: './create-applicant.component.html',
  //styleUrls: ['./create-applicant.component.css']
})
export class CreateApplicantComponent implements OnInit {

      ngOnInit() {}

  infoForm: FormGroup
    firstName: FormControl
    lastName: FormControl
    hourlySalary: FormControl
    // createdEmployee: IEmployee
    // employees: IEmployee[]

  //   constructor(private router: Router
  //       , private employeeService: EmployeeService) { }

  //   ngOnInit() {
  //       this.firstName = new FormControl()
  //       this.lastName = new FormControl()
  //       this.hourlySalary = new FormControl()
  //       this.infoForm = new FormGroup({
  //           firstName: this.firstName,
  //           lastName: this.lastName,
  //           hourlySalary: this.hourlySalary
  //       })
  //   }

  //   createEmployee(formValues) {
  //       this.createdEmployee = {   
  //       firstName: formValues.firstName,
  //       lastName : formValues.lastName,
  //       hourlySalary : formValues.hourlySalary
  //       }

  //       this.employeeService.insertEmployee(this.createdEmployee)



  //   }

  //   cancel() {

  //   }

}
