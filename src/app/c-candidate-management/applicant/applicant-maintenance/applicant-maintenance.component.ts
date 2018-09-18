import { Component, OnInit } from '@angular/core';
import { IApplicantInsert } from '../../../shared/models/applicant_insert.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicantService } from '../../../shared/services/applicant.service';
import { IApplicantInfo } from '../../../shared/models/applicant_info.model';
import { IApplicantMaintInfo } from '../../../shared/models/applicant_maintenance.model'
import { FormGroup, FormControl, Form } from '@angular/forms';
import { NgbModal,  ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PaginationService } from '../../../shared/services/pagination.service';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-applicant-maintenance',
  templateUrl: './applicant-maintenance.component.html',
  styleUrls: ['./applicant-maintenance.component.css']
})
export class ApplicantMaintenanceComponent implements OnInit {

  private applicantSubscription: Subscription = new Subscription();
  private applicantTotalSubcription: Subscription = new Subscription();
  private applicantInactiveSubscription: Subscription = new Subscription();
  private applicantTotalInactiveSubcription: Subscription = new Subscription();
  

  interval 

  pageSize:number = this.pagination.pageSize

  activePageNumber: number = this.pagination.pageNumber
  inactivePageNumber: number = this.pagination.pageNumber


  activeCollectionSize: number
  inactiveCollectionSize: number


  activePaginatorSize: number
  inactivePaginatorSize: number

  
  searchButtonClicked: boolean = false
  totalApplicants: number
  paginatorCollectionSize: number


  searchButtonClickedInactive: boolean = false
  totalInactiveApplicants: number
  paginatorCollectionSizeInactive: number


  searchBarInput: string
  sortBy: string

  searchBarInputInactive: string
  sortByInactive: string

  
  _listFilter: string;
  filteredApplicants: IApplicantMaintInfo[]

  _listInactiveFilter: string;
  inactiveFilteredApplicants: IApplicantMaintInfo[]

  selectedFilter: string = 'All Applicants';

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

  ngOnInit() {

    this.applicantService.universalSearchCount('_', 
    this.pagination.pageNumber, this.pagination.pageSize)
    .subscribe((data: number) => {
      this.totalApplicants = data['Data'][0]
      this.pagination.setPageRange(this.totalApplicants)
      this.activePaginatorSize = this.pagination.paginatorSize
      this.activeCollectionSize = this.pagination.getCollectionSize()
    })

    this.applicantService.universalSearch('_', this.pagination.pageNumber, this.pagination.pageSize)
    .subscribe((data: IApplicantMaintInfo[]) => {
       this.allApplicants = data['Data'];
       this.filteredApplicants = this.allApplicants;
       this.sortedData = this.allApplicants.slice();
    })

    this.applicantService.universalSearchCountInactive('_', 
    this.pagination.pageNumber, this.pagination.pageSize)
    .subscribe((data: number) => {
      this.totalInactiveApplicants = data['Data'][0]
      this.pagination.setPageRange(this.totalInactiveApplicants)
      this.inactivePaginatorSize = this.pagination.paginatorSize
      this.inactiveCollectionSize = this.pagination.getCollectionSize()
    })

    this.applicantService.universalSearchInactive('_', this.pagination.pageNumber, this.pagination.pageSize)
    .subscribe((data: IApplicantMaintInfo[]) => {
       this.allPastApplicants = data['Data'];
       this.inactiveFilteredApplicants = this.allPastApplicants;
       this.sortedInactive = this.allPastApplicants.slice();
    })


 
    this.initilalizeEditApplicantForm()
    this.initializeAddApplicantForm()

  }
 
  changeTab(event) {
    console.log(event.title)
    console.log('yes')
  }

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


  sortParamDropdownChangeHandler(event: any) {
    //update the ui
    this.sortBy = event.target.value;
  }


  get listFilter(): string {
    return this._listFilter;

  }

  set listFilter(value: string) {

    this._listFilter = value;
    this.filteredApplicants = this.listFilter ? this.performFilter(this.listFilter) : this.allApplicants;
    this.inactiveFilteredApplicants = this.listFilter ? this.performFilter(this.listFilter) : this.allPastApplicants;
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

    this.activePageNumber = page;

    if (this.searchBarInput === undefined) {
      this.applicantService.universalSearch('_', page, this.pagination.pageSize)
        .subscribe((data: IApplicantMaintInfo[]) => {
          this.allApplicants = data['Data'];
          //this.filteredApplicants = this.allApplicants;
          this.sortedData = this.allApplicants
        })
    }
    else {
      this.applicantService.universalSearch(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IApplicantMaintInfo[]) => {
          this.allApplicants = data['Data'];
         // this.filteredApplicants = this.allApplicants;
         this.sortedData = this.allApplicants;
        })
    }
  }

  get listInactiveFilter(): string {
    return this._listInactiveFilter;

  }

  set listInactiveFilter(value: string) {

    this._listInactiveFilter = value;
    this.filteredApplicants = this.listInactiveFilter ? this.performFilter(this.listInactiveFilter) : this.allPastApplicants;
  }

  performInactiveFilter(filterBy: string): IApplicantMaintInfo[] {
    filterBy = filterBy.toLocaleLowerCase();


    if (this.selectedFilter === 'Name/FirstName')
      return this.allPastApplicants.filter((applicant: IApplicantMaintInfo) =>
        applicant.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
		
	
    else if (this.selectedFilter === 'Name/LastName')
      return this.allPastApplicants.filter((applicant: IApplicantMaintInfo) =>
        applicant.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else if (this.selectedFilter === 'Location/City')
      return this.allPastApplicants.filter((applicant: IApplicantMaintInfo) =>
        applicant.city.toLocaleLowerCase().indexOf(filterBy) !== -1)
	
	else if (this.selectedFilter === 'Email')
      return this.allPastApplicants.filter((applicant: IApplicantMaintInfo) =>
        applicant.email.toLocaleLowerCase().indexOf(filterBy) !== -1);


    else if (this.selectedFilter === 'Location/Country')
      return this.allPastApplicants.filter((applicant: IApplicantMaintInfo) =>
        applicant.country.toLocaleLowerCase().indexOf(filterBy) !== -1);

    else
      // return this.allApplicants
      // Universal search (if no filter selected default all applicants) 
      return this.allPastApplicants.filter((applicant: IApplicantMaintInfo) => {
        return applicant.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1
		      || applicant.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1
		      || applicant.email.toLocaleLowerCase().indexOf(filterBy) !== -1
          || applicant.city.toLocaleLowerCase().indexOf(filterBy) !== -1
          || applicant.country.toLocaleLowerCase().indexOf(filterBy) !== -1
      })
  }

  
    
  loadPageInactive(page: number) {

    this.inactivePageNumber = page;

    if (this.searchBarInput === undefined) {
      this.applicantService.universalSearchInactive('_', page, this.pagination.pageSize)
        .subscribe((data: IApplicantMaintInfo[]) => {
          this.allApplicants = data['Data'];
          this.inactiveFilteredApplicants = this.allPastApplicants;
          this.sortedInactive = this.allPastApplicants
        })
    }
    else {
      this.applicantService.universalSearchInactive(this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IApplicantMaintInfo[]) => {
          this.allApplicants = data['Data'];
         this.inactiveFilteredApplicants = this.allPastApplicants;
         this.sortedInactive = this.allPastApplicants;
        })
    }
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
 
  
  sortedData: IApplicantMaintInfo[]
  sortedInactive: IApplicantMaintInfo[]


  sortData(sort:Sort){

    const aApplicants = this.allApplicants.slice();
    const iApplicants = this.allPastApplicants.slice();


    if(!sort.active || sort.direction === ''){
      this.sortedData = aApplicants;
      this.sortedInactive = iApplicants;
      return
    }

    this.sortedData =aApplicants.sort((a,b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active){
        case 'name': return compare(a.firstName, b.firstName, isAsc);
        case 'email': return compare (a.email, b.email, isAsc);
        case 'location': return compare (a.city, b.city, isAsc)
        default:return 0;
      }
    });


    
    this.sortedInactive = iApplicants.sort((a,b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active){
        case 'name': return compare(a.firstName, b.firstName, isAsc);
        case 'email': return compare (a.email, b.email, isAsc);
        case 'location': return compare (a.city, b.city, isAsc)
        default:return 0;
      }
    });


  }

}


function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
