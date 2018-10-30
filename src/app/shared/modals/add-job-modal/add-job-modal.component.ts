import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'add-job-modal',
  templateUrl: './add-job-modal.component.html',
  styleUrls: ['./add-job-modal.component.css']
})
export class AddJobModalComponent implements OnInit {

  newJobForm:FormGroup


  constructor(private formBuilder:FormBuilder, private modalService:ModalService) { }

  ngOnInit() {

    this.newJobForm = this.formBuilder.group({
      jobName: '',
      jobCompany: '',
      jobCity: '',
      jobCountry: '',
      jobCategory: '',
      jobType: '',
      jobDescription: '',
      addCategoryInput: '',
      addTypeInput: ''
    })
  }

  // openAddJob(content) {
  //   this.modalService.openModal(content)
  // }


}
