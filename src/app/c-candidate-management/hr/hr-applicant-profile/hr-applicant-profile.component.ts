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
import { ApplicationService } from '../../../shared/services/application.service';

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
  newPageSize:number = this.pageSize
  
  closeResult: string;

  public show:boolean = false;
  public buttonName:any = 'Show';
  constructor(private router : Router, private applicationService: ApplicationService,  
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
      applicationId: this.applicationService.currentApplication.applicationId,
      employeeId: 1,
      data: this.commentBoxInput
    }

      this.commentService.insertComment(comment)
      .subscribe(data => { console.log("POST:" + data) },
      error => { console.error("Error: ", error) })

    setTimeout(
      this.loadComments(), 100)
  }

  loadActions(){

    this.applicationActionService.countApplicationActions(this.applicationService.currentApplication.applicationId)
    .subscribe((data:number) => {
      this.totalActions = data['Data'][0]
      this.pagination.setPageRange(this.totalActions)
      this.paginatorCollectionSize = this.pagination.getCollectionSize()
      console.log(this.applicationService.currentApplication.applicationId)
    })

    this.applicationActionService.getAllApplicationActions(this.applicationService.currentApplication.applicationId, this.page, this.pageSize)
    .subscribe((data:IApplicationActionShow[]) => {
      this.actions = data['Data']
      console
    })

  }

  loadPage(page: number) {

    this.pagination.pageNumber = page
    this.applicationActionService.getAllApplicationActions(this.applicationService.currentApplication.applicationId, page, this.pageSize)
    .subscribe((data:IApplicationActionShow[]) => {
      this.actions = data['Data']
    })

  }

  showMoreActions() {
    this.newPageSize = this.newPageSize * 2
    setTimeout(
      this.loadActions()
    , 100)
  }

  showLessActions() {
    this.newPageSize = 5
    this.page = 1
    setTimeout(
      this.loadActions()
    , 50)
  }

  loadComments() {
    this.commentService.getCommentsByApplicationId(this.applicationService.currentApplication.applicationId, 1, 5)
    .subscribe((data:IComment[]) => {
      this.comments = data['Data']
    })
  }
}
