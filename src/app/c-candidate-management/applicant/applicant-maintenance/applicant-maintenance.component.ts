import { Component, OnInit } from '@angular/core';
import { IApplicantInsert } from '../../../shared/models/applicant_insert.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicantService } from '../../../shared/services/applicant.service';
import { IApplicantInfo } from '../../../shared/models/applicant_info.model';
import { IApplicantMaintInfo } from '../../../shared/models/applicant_maintenance.model'
import { FormGroup, FormControl, Form } from '@angular/forms';
import { NgbModal,  ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-applicant-maintenance',
  templateUrl: './applicant-maintenance.component.html',
  //styleUrls: ['./applicant-maintenance.component.css']
})
export class ApplicantMaintenanceComponent implements OnInit {


  currentApplicant
  newApplicant:IApplicantInsert

  allApplicants: IApplicantMaintInfo[]
  allPastApplicants: IApplicantMaintInfo[]
  applicant: IApplicantInfo


  applicantEditForm: FormGroup 
  applicantFirstName: FormControl
  applicantLastName:FormControl
  applicantEmail:FormControl
  applicantPhoneNumber: FormControl
  applicantPassword:FormControl
  applicantAddressLine:FormControl
  applicantAddressLine2:FormControl
  applicantCity:FormControl
  applicantState:FormControl
  applicantCountry:FormControl
  applicantZipCode:FormControl
  confirmPassword:FormControl

  addApplicantForm:FormGroup
  firstName: FormControl
  lastName:FormControl
  email:FormControl
  phone:FormControl
  password:FormControl
  addressLine:FormControl
  addressLine2:FormControl
  city:FormControl
  state:FormControl
  country:FormControl
  zipCode:FormControl

  closeResult:string;
 

  constructor(
    private router: Router,
    private applicantService: ApplicantService, 
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  initilalizeEditApplicantForm() {
    this.applicantFirstName= new FormControl()
    this.applicantLastName= new FormControl()
    this.applicantEmail= new FormControl()
    this.applicantPhoneNumber = new FormControl()
    this.applicantPassword= new FormControl()
    this.applicantAddressLine= new FormControl()
    this.applicantAddressLine2= new FormControl()
    this.applicantCity= new FormControl()
    this.applicantState= new FormControl()
    this.applicantCountry= new FormControl()
    this.applicantZipCode= new FormControl()


    this.applicantEditForm = new FormGroup({
      applicantFirstName: this.applicantFirstName,
      applicantLastName:this.applicantLastName,
      applicantEmail:this.applicantEmail,
      applicantPhoneNumber:this.applicantPhoneNumber,
      applicantPassword:this.applicantPassword,
      applicantAddressLine:this.applicantAddressLine,
      applicantAddressLine2:this.applicantAddressLine2,
      applicantCity:this.applicantCity,
      applicantState:this.applicantState,
      applicantCountry:this.applicantCountry,
      applicantZipCode:this.applicantZipCode
    })

  }

  initializeAddApplicantForm() {
   this.firstName = new FormControl();
   this.lastName = new FormControl();
   this.email = new FormControl();
   this.phone = new FormControl();
   this.password = new FormControl();
   this.addressLine = new FormControl();
   this.addressLine2 = new FormControl();
   this.city = new FormControl();
   this.state = new FormControl();
   this.country = new FormControl();
   this.zipCode = new FormControl();
   this.confirmPassword = new FormControl()

   this.addApplicantForm = new FormGroup({
     firstName: this.firstName,
     lastName:this.lastName,
     email:this.email,
     phone:this.phone,
     password:this.password,
     addressLine:this.addressLine,
     addressLine2:this.addressLine2,
     city:this.city,
     state:this.state,
     country:this.country,
     zipCode:this.zipCode,
     confirmPassword:this.confirmPassword
   })
   
  }

  ngOnInit() {

    this.initilalizeEditApplicantForm()
    this.initializeAddApplicantForm()

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
      phone: newApplicantForm.applicantPhoneNumber,
      addressLine: newApplicantForm.addressLine,
      addressLine2: newApplicantForm.addressLine2,
      city: newApplicantForm.city,
      stateProvince: newApplicantForm.state,
      country: newApplicantForm.country,
      zipCode: newApplicantForm.zipCode
    }

    this.applicantService.addApplicantMaintenance(this.newApplicant)
    .subscribe(data => { console.log("POST:" + data) },
        error => { console.error("Error: ", error) })
   
  }

  openEdit(content, applicant) {


    this.applicantEditForm.get('applicantFirstName').setValue(applicant.firstName)
    this.applicantEditForm.get('applicantLastName').setValue(applicant.lastName)
    this.applicantEditForm.get('applicantEmail').setValue(applicant.email)
    this.applicantEditForm.get('applicantPhoneNumber').setValue(applicant.phone)
    this.applicantEditForm.get('applicantAddressLine').setValue(applicant.addressLine)
    this.applicantEditForm.get('applicantAddressLine2').setValue(applicant.addressLine2)
    this.applicantEditForm.get('applicantCity').setValue(applicant.city)
    this.applicantEditForm.get('applicantCountry').setValue(applicant.country)
    this.applicantEditForm.get('applicantState').setValue(applicant.stateProvince)
    this.applicantEditForm.get('applicantZipCode').setValue(applicant.zipCode)



    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:'lg'}).result.then((result) => {

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
      return  `with: ${reason}`;
    }
  }

 

}
