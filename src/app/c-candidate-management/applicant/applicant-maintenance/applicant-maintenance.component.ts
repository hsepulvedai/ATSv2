import { Component, OnInit } from '@angular/core';
import { IApplicantInsert } from '../../../shared/models/applicant_insert.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicantService } from '../../../shared/services/applicant.service';
import { IApplicantInfo } from '../../../shared/models/applicant_info.model';
import { IApplicantMaintInfo } from '../../../shared/models/applicant_maintenance.model'
import { FormGroup, FormControl, Form } from '@angular/forms';
import { NgbModal,  ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PaginationService } from '../../../shared/services/pagination.service';

@Component({
  selector: 'app-applicant-maintenance',
  templateUrl: './applicant-maintenance.component.html',
  styleUrls: ['./applicant-maintenance.component.css']
})
export class ApplicantMaintenanceComponent implements OnInit {

  searchButtonClicked: boolean = false
  page: number = this.pagination.pageNumber;
  paginatorSize: number
  totalApplicants: number
  paginatorCollectionSize:number
  pageSize:number

  searchBarInput: string
  sortBy: string

  
  _listFilter: string;
  filteredApplicants: IApplicantMaintInfo[]

  selectedFilter: string = 'All Jobs';

  selectedSort

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
    private modalService: NgbModal,
    private pagination: PaginationService
  ) { }

   //event handler for the select element's change event
   selectDropdownChangeHandler(event: any) {
    //update the ui
    this.selectedFilter = event.target.value;
  }

  sortDropdownChangeHandler(event: any) {
    //update the ui
    this.selectedSort = event.target.value;
  }

  sortParamDropdownChangeHandler(event: any) {
    //update the ui
    this.sortBy = event.target.value;
  }

  universalSearch() {

    if (this.searchBarInput != undefined) {

      this.applicantService.universalSearchCount(this.searchBarInput, 
      this.pagination.pageNumber, this.pagination.pageSize)
      .subscribe((data: number) => {
        this.totalApplicants = data['Data'][0]
        this.pagination.setPageRange(this.totalApplicants)
        this.paginatorSize = this.pagination.paginatorSize
        this.paginatorCollectionSize = this.pagination.paginatorSize * 10
      })

      this.applicantService.universalSearch(this.searchBarInput, this.pagination.pageNumber,
        this.pagination.pageSize)
        .subscribe((data: IApplicantMaintInfo[]) => {
          this.allApplicants = data['Data'];
          this.filteredApplicants = this.allApplicants;
        })
    }
  }

  get listFilter(): string {
    return this._listFilter;

  }

  set listFilter(value: string) {

    this._listFilter = value;
    this.filteredApplicants = this.listFilter ? this.performFilter(this.listFilter) : this.allApplicants;
  }

  performFilter(filterBy: string): IApplicantMaintInfo[] {
    filterBy = filterBy.toLocaleLowerCase();


    if (this.selectedFilter === 'Name/FirstName')
      return this.allApplicants.filter((applicant: IApplicantMaintInfo) =>
        applicant.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
		
	
    else if (this.selectedFilter === 'Name/LastName')
      return this.allApplicants.filter((applicant: IApplicantMaintInfo) =>
        applicant.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Location/City')
      return this.allApplicants.filter((applicant: IApplicantMaintInfo) =>
        applicant.city.toLocaleLowerCase().indexOf(filterBy) !== -1)
	
	else if (this.selectedFilter === 'Email')
      return this.allApplicants.filter((applicant: IApplicantMaintInfo) =>
        applicant.email.toLocaleLowerCase().indexOf(filterBy) !== -1);


    else if (this.selectedFilter === 'Location/Country')
      return this.allApplicants.filter((applicant: IApplicantMaintInfo) =>
        applicant.country.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else
      // return this.allApplicants
      // Universal search (if no filter selected default all applicants) 
      return this.allApplicants.filter((applicant: IApplicantMaintInfo) => {
        return applicant.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1
		      || applicant.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1
		      || applicant.email.toLocaleLowerCase().indexOf(filterBy) !== -1
          || applicant.city.toLocaleLowerCase().indexOf(filterBy) !== -1
          || applicant.country.toLocaleLowerCase().indexOf(filterBy) !== -1
      })
  }

  
  loadPage(page: number) {

    if (this.searchBarInput === undefined) {
      this.applicantService.universalSearch('_', page, this.pagination.pageSize)
        .subscribe((data: IApplicantMaintInfo[]) => {
          this.allApplicants = data['Data'];
          this.filteredApplicants = this.allApplicants;
        })
    }
    else {
      this.applicantService.universalSearch(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IApplicantMaintInfo[]) => {
          this.allApplicants = data['Data'];
          this.filteredApplicants = this.allApplicants;
        })
    }
  }
  
  ngOnInit() {

    this.applicantService.universalSearchCount('_', 
    this.pagination.pageNumber, this.pagination.pageSize)
    .subscribe((data: number) => {
      this.totalApplicants = data['Data'][0]
      this.pagination.setPageRange(this.totalApplicants)
      this.paginatorSize = this.pagination.paginatorSize
      this.paginatorCollectionSize = this.pagination.paginatorSize * 10
    })

this.applicantService.universalSearch('_', this.pagination.pageNumber, this.pagination.pageSize)
  .subscribe((data: IApplicantMaintInfo[]) => {
    this.allApplicants = data['Data'];
    this.filteredApplicants = this.allApplicants;
  })

  this.pageSize =  this.pagination.pageSize

    this.initilalizeEditApplicantForm()
    this.initializeAddApplicantForm()

     this.applicantService.showAllInactiveApplicants()
     .subscribe((data:IApplicantInfo[]) => {
       this.allPastApplicants = data['Data'];
      }) 

  }

  makeApplicantInactive(id) {
    this.applicantService.setInactiveApplicant(id)
    .subscribe(data => { console.log("Patched:" + data) },
    error => { console.error("Error: ", error) })

    this.applicantService.showAllActiveApplicants()
    .subscribe((data:IApplicantInfo[]) => {
      this.allApplicants = data['Data'];
     }) 

     this.applicantService.showAllInactiveApplicants()
     .subscribe((data:IApplicantInfo[]) => {
       this.allPastApplicants = data['Data'];
      }) 
  }

  makeApplicantActive(id) {
    this.applicantService.setActiveApplicant(id)
    .subscribe(data => { console.log("Patched:" + data) },
    error => { console.error("Error: ", error) })

    this.applicantService.showAllActiveApplicants()
    .subscribe((data:IApplicantInfo[]) => {
      this.allApplicants = data['Data'];
     }) 

     this.applicantService.showAllInactiveApplicants()
     .subscribe((data:IApplicantInfo[]) => {
       this.allPastApplicants = data['Data'];
      }) 
  }

  openAddApplicant(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-add', size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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


  
  editApplicant(updatedApplicantForm){
   
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
 

}
