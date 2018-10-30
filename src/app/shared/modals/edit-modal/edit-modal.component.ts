import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {

  testForm:FormGroup

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.testForm = this.fb.group({
      name:''
    })


  }

}
