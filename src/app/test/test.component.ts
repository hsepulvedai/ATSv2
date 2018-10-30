import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/services/job.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  testForm:FormGroup

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.testForm = this.fb.group({
      name:''
    })
  }


  addTrue:boolean = false;

  addItem(){
    this.addTrue = true;
  }

  cancelAddItem(){
    this.addTrue = false;
  }

}
