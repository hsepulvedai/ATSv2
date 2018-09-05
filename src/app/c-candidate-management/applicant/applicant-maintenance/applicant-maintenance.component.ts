import { Component, OnInit } from '@angular/core';
import { IApplicantInsert } from '../../../shared/models/applicant_insert.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicantService } from '../../../shared/services/applicant.service';
import { IApplicantInfo } from '../../../shared/models/applicant_info.model';
import { FormGroup, FormControl, Form } from '@angular/forms';

@Component({
  selector: 'app-applicant-maintenance',
  templateUrl: './applicant-maintenance.component.html',
  //styleUrls: ['./applicant-maintenance.component.css']
})
export class ApplicantMaintenanceComponent implements OnInit {

  allApplicants: IApplicantInfo[]
  allPastApplicants: IApplicantInfo[]
  applicant: IApplicantInfo
  addApplicantForm:FormGroup

  applicantFirstName: FormControl
  applicantLastName:FormControl
  applicantEmail:FormControl
  applicantPassword:FormControl
  applicantAddressLine:FormControl
  applicantAddressLine2:FormControl
  applicantCity:FormControl
  applicantState:FormControl
  applicantCountry:FormControl
  applicantZipCode:FormControl
  

  newApplicant:IApplicantInsert


  constructor(
    private router: Router,
    private applicantService: ApplicantService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.applicantFirstName= new FormControl()
    this.applicantLastName= new FormControl()
    this.applicantEmail= new FormControl()
    this.applicantPassword= new FormControl()
    this.applicantAddressLine= new FormControl()
    this.applicantAddressLine2= new FormControl()
    this.applicantCity= new FormControl()
    this.applicantState= new FormControl()
    this.applicantCountry= new FormControl()
    this.applicantZipCode= new FormControl()

    

    this.addApplicantForm = new FormGroup({
      applicantFirstName: this.applicantFirstName,
      applicantLastName:this.applicantLastName,
      applicantEmail:this.applicantEmail,
      applicantPassword:this.applicantPassword,
      addressLine:this.applicantAddressLine,
      addressLine2:this.applicantAddressLine2,
      city:this.applicantCity,
      state:this.applicantState,
      country:this.applicantCountry,
      zipCode:this.applicantZipCode,
    })

    this.applicantService.showAllActiveApplicants()
    .subscribe((data:IApplicantInfo[]) => {
      this.allApplicants = data['Data'];
     }) 

     this.applicantService.showAllInactiveApplicants()
     .subscribe((data:IApplicantInfo[]) => {
       this.allPastApplicants = data['Data'];
      }) 

  }

  makeApplicantInactive(id) {
    this.applicantService.setInactiveApplicant(id)
    .subscribe(data => { console.log("Patched:" + data) },
    error => { console.error("Error: ", error) })
  }

  makeApplicantActive(id) {
    this.applicantService.setActiveApplicant(id)
    .subscribe(data => { console.log("Patched:" + data) },
    error => { console.error("Error: ", error) })
  }

  createApplicant(newApplicantForm){
    this.newApplicant = {
      firstName: newApplicantForm.applicantFirstName, 
      lastName: newApplicantForm.applicantLastName,
      email: newApplicantForm.applicantEmail,
      password: newApplicantForm.applicantPassword,
      addressLine: newApplicantForm.addressLine,
      addressLine2: newApplicantForm.addressLine2,
      city: newApplicantForm.city,
      stateProvince: newApplicantForm.state,
      country: newApplicantForm.state,
      zipCode: newApplicantForm.zipCode
    }

    this.applicantService.addApplicantMaintenance(this.newApplicant)
    .subscribe(data => { console.log("POST:" + data) },
        error => { console.error("Error: ", error) })

    //console.log(this.newApplicant)
  }

}
