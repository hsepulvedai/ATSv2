/*This pages serves as a profile type of page for the HR employee to view specific aspects of an application.
It shows the applicant's information, a timeline with actions taken in that application, a pending tasks list and 
a comments section*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IAction } from 'src/app/shared/models/action.model';
import { IStatus } from 'src/app/shared/models/status.model';
import { IApplication } from 'src/app/shared/models/application.model';
import { IApplicant } from 'src/app/shared/models/applicant.model';
import { IApplicationAction } from 'src/app/shared/models/application_action.model';
import { IComment } from 'src/app/shared/models/comment.model';
import { ITask } from 'src/app/shared/models/task.model';
import { ApplicationService } from 'src/app/shared/services/application.service';
import { ApplicationActionService } from 'src/app/shared/services/application-action.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { ModalService } from 'src/app/shared/services/modal.service';



@Component({
  selector: 'app-hr-applicant-profile',
  templateUrl: './hr-applicant-profile.component.html',
  styleUrls: ['./hr-applicant-profile.component.css']
})
export class HrApplicantProfileComponent implements OnInit {

  newActionForm: FormGroup

  editActionForm: FormGroup

  allActions: IAction[]
  allStatuses: IStatus[]

  commentBoxInput: string

  currentApplication: IApplication

  applicant: IApplicant
  action: IAction
  actions: IApplicationAction[]
  totalActions: number

  comments: IComment[]
  pendingTasks: ITask[]
  application: IApplication


  page: number = this.pagination.pageNumber;
  paginatorSize: number
  totalJobs: number
  paginatorCollectionSize: number
  pageSize: number = 5
  newPageSize: number = this.pageSize

  closeResult: string;
  editCommentForm: FormGroup

  public show: boolean = false;
  public buttonName: any = 'Show';
  applicationId:number

  considerationSelection:number



  constructor(private applicationService: ApplicationService,
    private ngbModalService: NgbModal, private applicationActionService: ApplicationActionService
    , private pagination: PaginationService, private commentService: CommentService, private modalService: ModalService,
    private formBuilder: FormBuilder, private route:ActivatedRoute) { }

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id');

    this.applicationService.getApplicationInfoByAppId(id)
    .subscribe((data:IApplication) => {
      this.application = data['Data'][0];
      console.log(this.application)
      this.applicationId = id
      this.loadActions();
      this.loadComments();

      if(this.application.consideration == 'Yes')
        this.considerationSelection = 1
        if(this.application.consideration == 'No')
        this.considerationSelection = 2
        if(this.application.consideration == 'Maybe')
        this.considerationSelection = 3
    });

    this.editCommentForm = this.formBuilder.group({
      editCommentText: ''
    })

    this.newActionForm = this.formBuilder.group({
      actionType: '',
      actionStatus: '',
      actionComments: '',
      actionDate: '',
      time: ''
    })

    this.editActionForm = this.formBuilder.group({
      newActionType: '',
      newActionStatus: '',
      newActionComments: '',
      newActionDate: '',
      newTime: ''
    })

    // this.applicationService.getAllTasksByAppIdAndStatus(applicationId, "pending")
    //   .subscribe((data) => {
    //     this.pendingTasks = data['Data'];
    //   });

    this.applicationActionService.getAllApplicationTypes()
      .subscribe((data) => {
        this.allActions = data['Data'];
      });

    this.applicationActionService.getAllApplicationStatuses()
      .subscribe((data) => {
        this.allStatuses = data['Data'];
      });
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }


  openNewAction(content) {

    this.ngbModalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {


      (this.closeResult = `Closed with: ${result}`)
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  currentAction

  date: Date;

  openModal(content, data, event) {

    if (event.target.id === 'editComment') {
      this.editCommentForm.get('editCommentText').setValue(data.comment)
    }

    this.modalService.openModal(content)
  }

  openEditAction(contentEdit, action) {

    this.applicationActionService.currentAction = action;

    this.currentAction = action

    this.date = action.actionDate

    console.log(action)

    this.editActionForm.controls['newActionType'].setValue(action.actionType, { onlySelf: true })
    this.editActionForm.controls['newActionStatus'].setValue(action.status, { onlySelf: true })
    this.editActionForm.get('newActionComments').setValue(action.comments)
    // this.editActionForm.controls['newActionDate'].setValue(this.date)

    this.ngbModalService.open(contentEdit, { ariaLabelledBy: 'modal-basic-edit', size: 'lg' }).result.then((result) => {


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



  newAction: IAction


  insertAction(newActionForm) {

    var date = newActionForm.actionDate.year + '/' + newActionForm.actionDate.month + '/'
      + newActionForm.actionDate.day + " " + newActionForm.time

    this.newAction = {
      applicationId: this.applicationId,
      employeeId: 4, // TODO: Change to selected employee from dropdown.
      action: newActionForm.actionType,
      status: newActionForm.actionStatus,
      comments: newActionForm.actionComments,
      actionDate: date,
    }

     this.applicationActionService.insertAction(this.newAction)
    .subscribe(data => { this.loadActions() },
      error => { console.error("Error: ", error) })

  }

  updatedAction: IAction

  editAction(editActionForm) {


    var olderdate = this.currentAction.actionDate

    if (editActionForm.newActionDate != null) {
      var formdate = editActionForm.newActionDate + editActionForm.newTime

      var date = editActionForm.newActionDate.year + '/' + editActionForm.newActionDate.month + '/'
        + editActionForm.newActionDate.day + " : " + editActionForm.newTime


      if (this.currentAction.actionDate != formdate)
        newDate = date

    }

    var newDate = this.currentAction.actionDate

    this.updatedAction = {
      actionId: this.currentAction.actionId,
      action: editActionForm.newActionType,
      status: editActionForm.newActionStatus,
      comments: editActionForm.newActionComments,
      actionDate: newDate
    }

    this.applicationActionService.editAction(this.updatedAction)
      .subscribe(data => { this.loadActions()},
        error => { console.error("Error: ", error) })

    this.editActionForm.reset();

  }

  insertComment() {

    if (this.commentBoxInput != '' && this.commentBoxInput != undefined) {
      var comment = {
        applicationId: this.applicationId,
        employeeId: 1,
        data: this.commentBoxInput
      }

      this.commentService.insertComment(comment)
        .subscribe(data => { this.loadComments() },
          error => { console.error("Error: ", error) })

      // setTimeout(
      //   this.loadComments(), 100)
    }

    this.commentBoxInput = '';

  }

  loadActions() {

    this.applicationActionService.countApplicationActions(this.applicationId)
      .subscribe((data: number) => {
        this.totalActions = data['Data'][0]
        this.pagination.setPageRange(this.totalActions)
        this.paginatorCollectionSize = this.pagination.getCollectionSize()

        this.applicationActionService.getAllApplicationActions(this.applicationId, this.page, this.newPageSize)
          .subscribe((data: IApplicationAction[]) => {
            this.actions = data['Data']
          })
      })
  }

  showMoreActions() {
    this.newPageSize = this.newPageSize * 2
    this.loadActions()
  }

  showLessActions() {
    this.newPageSize = 5
    this.page = 1
    this.loadActions()
  }

  loadComments() {
    this.commentService.getCommentsByApplicationId(this.applicationId)
      .subscribe((data: IComment[]) => {
        this.comments = data['Data']
      })
  }

  editComment(comment) {

    // must make this only avaliable to the user that created the comment.

    // this.commentService.editComment(comment).subscribe(data => { console.log("UPDATE:" + data) },
    // error => { console.error("Error: ", error) })

    // setTimeout(this.loadComments(), 100)

    console.log('Edit comment')
  }

  selectedAction: IAction

  selectActionChangeHandler(event: any) {
    this.selectedAction = event.target.value;
  }

  selectedStatus: IStatus

  selectTypeChageHandler(event: any) {
    this.selectedStatus = event.target.value;
  }

  selectedDate: Date

  selectDateChangeHandler(event: any) {
    this.selectedDate = event.target.value;
  }
}
