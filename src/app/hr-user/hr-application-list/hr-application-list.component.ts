//This page allows an HR employee to view applications assigned to them
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Sort } from '@angular/material';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IApplication } from 'src/app/shared/models/application.model';
import { ITask } from 'src/app/shared/models/task.model';
import { ApplicationService } from 'src/app/shared/services/application.service';
import { PaginationService } from 'src/app/shared/services/pagination.service';


@Component({
  selector: 'app-hr-application-list',
  templateUrl: './hr-application-list.component.html',
  styleUrls: ['./hr-application-list.component.css']
})
export class HrApplicationListComponent implements OnInit {

  private applicationsSubscription: Subscription = new Subscription();
  private applicationsTotalSubscription: Subscription = new Subscription();

  totalApplications: number
  counts: number[]
  applicationCount: number[]
  index = 0;

  searchBarInput: string
  pageSize: number
  paginatorSize: number
  paginatorCollectionSize: number
  page: number = this.pagination.pageNumber;



  applications: IApplication[]
  application: IApplication
  sortedData: IApplication[]

  considerations:string[] = ["Yes", "No", "Maybe"]

  tasks: ITask[]

  // for now 
  recruiterId: number = 1


  closeResult: string;


  constructor(
    private router: Router,
    private modalService: NgbModal,
    private applicationService: ApplicationService,
    private pagination: PaginationService,
  ) {
  }


  goToApplicationDetails(application) {
    this.applicationService.currentApplication = application
    this.applicationService.currentApplication.recruiterId = this.recruiterId

    this.router.navigate(['hr-applicant-profile'])
  }

  ngOnInit() {

    this.pageSize = this.pagination.pageSize
    this.paginatorSize = this.pagination.paginatorSize

    setTimeout(() => { this.refreshData() }, 100);
  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  loadPage(page: number) {

    this.pagination.pageNumber = page

    if (this.searchBarInput === undefined) {
      this.applicationService.universalSearch(this.recruiterId, '_', page, this.pagination.pageSize)
        .subscribe((data: IApplication[]) => {
          this.applications = data['Data'];
          this.sortedData = this.applications
        })
    }
    else {
      this.applicationService.universalSearch(this.recruiterId, this.searchBarInput, page, this.pagination.pageSize)
        .subscribe((data: IApplication[]) => {
          this.applications = data['Data'];
          this.sortedData = this.applications
        })
    }
  }


  universalSearch() {

    setTimeout(() => { this.refreshData() }, 200);
    setTimeout(() => { this.loadPage(1) }, 200);

  }

  refreshData() {

    if (this.searchBarInput === undefined || this.searchBarInput === '') {
      this.applicationsTotalSubscription.add(this.applicationService.universalSearchCount
        (this.recruiterId, '_', this.pagination.pageNumber, this.pageSize)
        .subscribe((data: number) => {
          this.totalApplications = data['Data'][0]
          this.pagination.setPageRange(this.totalApplications)
          this.paginatorSize = this.pagination.paginationCollectionSize
          this.paginatorCollectionSize = this.pagination.getCollectionSize()
          console.log(this.totalApplications)
        }))
      this.applicationsSubscription.add(this.applicationService.universalSearch(this.recruiterId, '_', this.pagination.pageNumber, this.pageSize)
        .subscribe((data: IApplication[]) => {
          this.applications = data['Data'];
          this.sortedData = this.applications.slice();
        }))
    }

    else {
      this.applicationsTotalSubscription.add(this.applicationService.universalSearchCount
        (this.recruiterId, this.searchBarInput, this.pagination.pageNumber, this.pageSize)
        .subscribe((data: number) => {
          this.totalApplications = data['Data'][0]
          this.pagination.setPageRange(this.totalApplications)
          this.paginatorSize = this.pagination.paginationCollectionSize
          this.paginatorCollectionSize = this.pagination.getCollectionSize()
          console.log(this.totalApplications)
        }))

      this.applicationsSubscription.add(this.applicationService.universalSearch(this.recruiterId, this.searchBarInput, this.pagination.pageNumber, this.pageSize)
        .subscribe((data: IApplication[]) => {
          this.applications = data['Data'];
          this.sortedData = this.applications.slice();
        }))
    }
  }

  // sortData(sort: Sort) {

  //   this.sortedData = this.sort.sortTheData(sort, this.applications)

  // }

}
