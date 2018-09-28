/*<!--This page was intended to be used to create a new user-->*/
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/models/user.model'
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../../shared/services/user.service';
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  //styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  infoForm: FormGroup
  firstName: FormControl
  lastName: FormControl
  email: FormControl
  password: FormControl

  createdEmployee: IUser
  employees: IUser[]

  constructor(private router: Router
      , private userService: UserService) { }

  ngOnInit() {
      this.firstName = new FormControl()
      this.lastName = new FormControl()
      this.email = new FormControl()
      this.password = new FormControl ()
      this.infoForm = new FormGroup({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
      })
  }

  createUser(formValues) {
      this.createdEmployee = {   
      firstName: formValues.firstName,
      lastName : formValues.lastName,
      email : formValues.email,
      password:formValues.password,
      // Must modify stored procedure and API
      roleId: 3
      }

      console.log(this.createdEmployee)

      this.userService.insertApplicantUser(this.createdEmployee)

      // this.router.navigate(['users/userMaintenance'])

  }

  cancel() {

    this.router.navigate(['welcome'])
  }
}
