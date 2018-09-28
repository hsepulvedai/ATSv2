/*This pages serves as a profile type of page for the HR employee to view specific aspects of an application.
It shows the applicant's information, a timeline with actions taken in that application, a pending tasks list and 
a comments section*/
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
import { IStatus } from '../../../shared/models/status.model';
import { IActionEdit } from '../../../shared/models/action_edit.mode';

@Component({
  selector: 'app-hr-applicant-profile',
  templateUrl: './hr-applicant-profile.component.html',
  //styleUrls: ['./hr-applicant-profile.component.css']
})
export class HrApplicantProfileComponent implements OnInit {


  newActionForm: FormGroup
  actionType: FormControl
  actionStatus: FormControl
  actionComments: FormControl
  actionDate: FormControl
  time: FormControl


  editActionForm: FormGroup
  newActionType: FormControl
  newActionStatus: FormControl
  newActionComments: FormControl
  newActionDate: FormControl
  newTime: FormControl

  allActions: IAction[]
  allStatuses: IStatus[]



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


  public show:boolean = false;
  public buttonName:any = 'Show';
  constructor(private router : Router, private applicationService: ApplicationService,  
    private modalService: NgbModal, private applicationActionService: ApplicationActionService
  ,private pagination:PaginationService, private commentService:CommentService) { }

  ngOnInit() {

   this.currentApplication = this.applicationService.currentApplication

   this.actionType = new FormControl();
   this.actionStatus = new FormControl();
   this.actionComments = new FormControl();
   this.actionDate = new FormControl();
   this.time = new FormControl();
    
   this.newActionForm = new FormGroup({
     actionType: this.actionType,
     actionStatus: this.actionStatus, 
     actionComments: this.actionComments,
     actionDate: this.actionDate,
     time: this.time
   })


   this.newActionType = new FormControl();
   this.newActionStatus = new FormControl();
   this.newActionComments = new FormControl();
   this.newActionDate = new FormControl();
   this.newTime = new FormControl();
    
   this.editActionForm = new FormGroup({
     newActionType: this.newActionType,
     newActionStatus: this.newActionStatus, 
     newActionComments: this.newActionComments,
     newActionDate: this.newActionDate,
     newTime: this.newTime
   })


    
  this.applicationService.getAllTasksByAppIdAndStatus(this.applicationService.currentApplication.applicationId, "pending")
  .subscribe((data) => {
    this.pendingTasks = data['Data'];

  })

  this.applicationActionService.getAllApplicationTypes()
      .subscribe((data) => {
        this.allActions = data['Data'];
      })

      this.applicationActionService.getAllApplicationStatuses()
      .subscribe((data) => {
        this.allStatuses = data['Data'];
        console.log(this.allStatuses)
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

  currentAction

  openEditAction(contentEdit, action) {

    this.applicationActionService.currentAction = action;

    this.currentAction = action
 

    this.editActionForm.controls['newActionType'].setValue(action.action, { onlySelf: true })
    this.editActionForm.controls['newActionStatus'].setValue(action.status, { onlySelf: true })
    this.editActionForm.get('newActionComments').setValue(action.comments)
    this.editActionForm.get('newActionDate').setValue(action.actionDate, 'MMMM d, y')
    this.editActionForm.get('newTime').setValue(action.actionDate, 'h:mm' )
  

    this.modalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-edit', size: 'lg' }).result.then((result) => {


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

    var date = newActionForm.actionDate.year + '/' + newActionForm.actionDate.month + '/' 
              + newActionForm.actionDate.day + " " + newActionForm.time 

    this.newAction = {
      applicationId: this.currentApplication.applicationId,
      recruiterId: this.currentApplication.recruiterId,
      action : newActionForm.actionType,
      status: newActionForm.actionStatus,
      comments: newActionForm.actionComments,
      actionDate: date,
    }

    console.log(this.newAction)


   this.applicationActionService.insertAction(this.newAction)
  .subscribe(data => { console.log("POST:" + data) },
    error => { console.error("Error: ", error) })

  }

  updatedAction: IActionEdit

  editAction(editActionForm){
    var date = editActionForm.actionDate.year + '/' + editActionForm.actionDate.month + '/'
              + editActionForm.actionDate.day + " " + editActionForm.time

    
    this.updatedAction = {
      actionId: this.currentAction.actionId, 
      action: editActionForm.actionType, 
      status: editActionForm.actionStatus, 
      comments: editActionForm.actionComments,
      actionDate: date

    }

    console.log(this.updatedAction)

  //  this.applicationActionService.editAction(this.updatedAction)
    


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


  selectedStatus: IStatus

  selectTypeChageHandler(event:any){
    this.selectedStatus = event.target.value;
  }
}
