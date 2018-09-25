import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { IHRApplicant } from '../../../shared/models/IHRApplicant.model'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HrApplicantProfileService } from '../../../shared/services/hr-applicant-profile.service';
import { IHRAction } from '../../../shared/models/IHRAction.model';
import { ApplicationActionService } from '../../../shared/services/application-action.service';
import { IApplicationActionShow } from '../../../shared/models/application-action-show.model';
import { PaginationService } from '../../../shared/services/pagination.service';
import { ApplicantService } from '../../../shared/services/applicant.service';
import { CommentService } from '../../../shared/services/comment.service';
import { IComment } from '../../../shared/models/comment.model';

@Component({
  selector: 'app-hr-applicant-profile',
  templateUrl: './hr-applicant-profile.component.html',
  //styleUrls: ['./hr-applicant-profile.component.css']
})
export class HrApplicantProfileComponent implements OnInit {

  commentBoxInput:string

  currentApplication

  applicant:IHRApplicant
  action: IHRAction
  actions:IApplicationActionShow[]
  totalActions:number

  comments:IComment[]


  page: number = this.pagination.pageNumber;
  paginatorSize: number
  totalJobs: number
  paginatorCollectionSize: number
  pageSize: number = 5
  
  closeResult: string;

  public show:boolean = false;
  public buttonName:any = 'Show';
  constructor(private router : Router, private applicantService: ApplicantService,  
    private modalService: NgbModal, private applicationActionService: ApplicationActionService
  ,private pagination:PaginationService, private commentService:CommentService) { }

  ngOnInit() {


    setTimeout(
      this.loadActions()
    , 50)

    setTimeout(
      this.loadComments()
    , 50)
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  
  openNewAction(content, job) {

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

  insertComment() {

    var comment = {
      id: 1,
      employeeId:1,
      data: this.commentBoxInput
    }
    this.commentService.insertComment(comment)
    .subscribe(data => { console.log("POST:" + data) },
    error => { console.error("Error: ", error) })

    setTimeout(
      this.loadComments(), 50)
  }

  // loadApplicantInfo(){
  //   this.applicantService.getHRApplicantInfo(6)
  //   .subscribe((data:IHRApplicant) => {
  //     this.applicant = data['Data'];
  //     this.applicantService.currentApplicant = this.applicant
  //   })
  // }

  loadActions(){

    this.applicationActionService.countApplicationActions(this.applicantService.currentApplicant)
    .subscribe((data:number) => {
      this.totalActions = data['Data'][0]
      this.pagination.setPageRange(this.totalActions)
      this.paginatorCollectionSize = this.pagination.getCollectionSize()
    })

    this.applicationActionService.getAllApplicationActions(1, 1, this.pageSize)
    .subscribe((data:IApplicationActionShow[]) => {
      this.actions = data['Data']
      console
    })

  }

  loadPage(page: number) {

    this.pagination.pageNumber = page
    this.applicationActionService.getAllApplicationActions(1, page, this.pageSize)
    .subscribe((data:IApplicationActionShow[]) => {
      this.actions = data['Data']
    })

  }

  showMoreActions() {
    this.pageSize = this.pageSize * 2
    setTimeout(
      this.loadActions()
    , 100)

    // console.log(this.paginatorSize)

    // console.log(this.page)
    // console.log(this.pageSize)
    // console.log(this.page * this.pageSize)
  }

  showLessActions() {
    this.pageSize = 5
    this.page = 1
    setTimeout(
      this.loadActions()
    , 50)
  }

  loadComments() {
    this.commentService.getCommentsByApplicationId(1, 1, 5)
    .subscribe((data:IComment[]) => {
      this.comments = data['Data']
    })
  }
}
