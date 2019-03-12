import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/services/job.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Skill } from '../shared/models/skill';
import { IJobType } from '../shared/models/job_type.model';
import { IJobCategory } from '../shared/models/job_category.model';
import { JobCategoryService } from '../shared/services/job-category.service';
import { JobTypeService } from '../shared/services/job-type.service';
import { Route, Router } from '@angular/router';
import { IJob } from '../shared/models/job.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

 constructor(){}

 ngOnInit(){
   
 }

}
