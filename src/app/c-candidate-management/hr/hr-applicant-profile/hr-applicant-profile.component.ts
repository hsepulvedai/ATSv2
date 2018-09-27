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
import { ITask } from '../../../shared/models/task.model';
import { FormGroup, FormControl } from '@angular/forms';
import { IAction } from '../../../shared/models/action.model';
import { IActionInsert } from '../../../shared/models/action_insert.model';
import { IApplicationInfo } from '../../../shared/models/application_info.model';

@Component({
  selector: 'app-hr-applicant-profile',
  templateUrl: './hr-applicant-profile.component.html',
  //styleUrls: ['./hr-applicant-profile.component.css']
})
export class HrApplicantProfileComponent implements OnInit {


  newActionForm: FormGroup
  actionName: FormControl
  actionComments: FormControl
  actionDate: FormControl

  allActions: Array<String>



  commentBoxInput:string

  currentApplication

  applicant:IHRApplicant
  action: IHRAction
  actions:IApplicationActionShow[]
  totalActions:number

  comments:IComment[]
  pendingTasks: ITask[]
  applicationInfo: IApplicationInfo


  page: number = this.pagination.pageNumber;
  paginatorSize: number
  totalJobs: number
  paginatorCollectionSize: number
  pageSize: number = 5
  newPageSize:number = this.pageSize
  
  closeResult: string;

  currentAppId:number;

  public show:boolean = false;
  public buttonName:any = 'Show';
  constructor(private router : Router, private applicationService: ApplicationService,  
    private modalService: NgbModal, private applicationActionService: ApplicationActionService
  ,private pagination:PaginationService, private commentService:CommentService) { }

  ngOnInit() {

   this.currentAppId = this.applicationService.currentApplication.applicationId;

   
   this.actionName = new FormControl()
   this.actionComments = new FormControl();
   this.actionDate = new FormControl();
    
   this.newActionForm = new FormGroup({
     actionName: this.actionName,
     actionComments: this.actionComments,
     actionDate: this.actionDate
   })


    
  this.applicationService.getAllTasksByAppIdAndStatus(this.applicationService.currentApplication.applicationId, "pending")
  .subscribe((data) => {
    this.pendingTasks = data['Data'];

  })

  this.applicationService.getAllApplicationActions()
      .subscribe((data) => {
        this.allActions = data['Data'];
      })


  this.applicationService.getApplicationInfoByAppId(this.applicationService.currentApplication.applicationId)
  .subscribe((data) => {
    this.applicationInfo = data['Data'][0];

  })

    setTimeout(
      this.loadActions()
    , 50)

    // setTimeout(
    //   this.loadComments(), 50
    // )

    this.commentService.getCommentsByApplicationId(this.applicationService.currentApplication.applicationId)
    .subscribe((data:IComment[]) => {
      this.comments = data['Data']
      console.log(this.comments)
    })



  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  
  openNewAction(content) {

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

  newAction:IActionInsert

  insertAction(newActionForm){

    this.newAction = {
      applicationId: this.currentAppId,
      action : newActionForm.actionName,
      status: 'Scheduled',
      comments: newActionForm.actionDescription,
      actionDate: newActionForm.actionDate
    }



  }

  insertComment() {

    if(this.commentBoxInput != '' && this.commentBoxInput != undefined) {
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

    this.commentBoxInput = '';

  }

  loadActions(){

    this.applicationActionService.countApplicationActions(this.applicationService.currentApplication.applicationId)
    .subscribe((data:number) => {
      this.totalActions = data['Data'][0]
      this.pagination.setPageRange(this.totalActions)
      this.paginatorCollectionSize = this.pagination.getCollectionSize()
      // console.log(this.applicationService.currentApplication.applicationId)
    })

    this.applicationActionService.getAllApplicationActions(this.applicationService.currentApplication.applicationId, this.page, this.newPageSize)
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
    this.commentService.getCommentsByApplicationId(this.applicationService.currentApplication.applicationId)
    .subscribe((data:IComment[]) => {
      this.comments = data['Data']
      console.log(this.comments)
    })
  }

  selectedAction: IAction
  
  selectActionChangeHandler(event: any) {
    this.selectedAction = event.target.value;

  }
}
