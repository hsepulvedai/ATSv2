import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Skill } from '../../models/skill';
import { IJobType } from '../../models/job_type.model';
import { IJobCategory } from '../../models/job_category.model';
import { JobCategoryService } from '../../services/job-category.service';
import { JobTypeService } from '../../services/job-type.service';
import { IJob } from '../../models/job.model';
import { IJobStatus } from '../../models/job_status.model';
import { JobStatusService } from '../../services/job-status.service';

/* This component contains a form to create and modify a job listing */
@Component({
  selector: 'job-info-form',
  templateUrl: './job-info-form.component.html',
  styleUrls: ['./job-info-form.component.css']
})
export class JobInfoFormComponent implements OnInit {

  @Input() 
  job:IJob

  @Output() 
  jobFormValue = new EventEmitter<IJob>();

  DEFAULT_REQ = true;
  skillWeight = 2;

  skillInput: string
  skills: Skill[] = [];
  applicationSkills: string[] = []

  jobCategories: IJobCategory[] = [];
  jobTypes: IJobType[] = [];
  allStatus:IJobStatus[] =[]

  createdJob: IJob

  pressedRemove: boolean = false;

  jobInfoForm: FormGroup;

  constructor(private fb: FormBuilder, private jobCategoryService: JobCategoryService,
    private jobTypeService: JobTypeService, private jobStatusService:JobStatusService) { }

  ngOnInit() {

    console.log(this.job.jobName)

    //Initialize and validate the form
    if(this.job == null) {
      this.jobInfoForm = this.fb.group({
        jobName: ['', Validators.required],
        jobCompany: '',
        jobCity: '',
        jobCountry: '',
        jobCategory:'',
        jobType: '',
        jobStatus: '',
        jobDescription:'',
        addCategoryInput: '',
        addTypeInput: '',
        activeJob: true
      });
    }
    else {
      this.jobInfoForm = this.fb.group({
        jobName: [this.job.jobName, Validators.required],
        jobCompany: '',
        jobCity: '',
        jobCountry: '',
        jobCategory:'',
        jobType: '',
        jobStatus: '',
        jobDescription:'',
        addCategoryInput: '',
        addTypeInput: '',
        activeJob: true
      });
    }


    this.jobCategoryService.showCategories()
      .subscribe((data: IJobCategory[]) => {
        this.jobCategories = data['Data'];
      });

    this.jobTypeService.showTypes()
      .subscribe((data: IJobType[]) => {
        this.jobTypes = data['Data']
      });

      this.jobStatusService.showAllStatus()
      .subscribe((data: IJobStatus[]) => {
        this.allStatus = data['Data']
      });
  }

  // Helper method to change the view into the delete view.
  pressRemove() {
    this.pressedRemove = !this.pressedRemove
  }

  onFormSubmit(newJobForm) {
    // Validates if a skill is required
    var stringReq: string;
    this.skills.forEach(element => {
      if (element.Required)
        stringReq = "@";
      else
        stringReq = "";

      // Concatenates the skills in specified format.
      // Format: Requirement;Skill;Weight*25
      var skillStr = stringReq + ";" + element.Skill + ";" + (element.Weight * 25)
      this.applicationSkills.push(skillStr)
    });

    this.createdJob = {
      jobName: newJobForm.jobName,
      companyId: 1, // TODO: Change to get employee company
      jobCategory: newJobForm.jobCategory,
      city: newJobForm.jobCity,
      country:newJobForm.jobCountry,
      jobType: newJobForm.jobType,
      jobStatus: newJobForm.jobStatus,
      jobDescription: newJobForm.jobDescription,
      jobSkills: this.applicationSkills.toString(),
      active:newJobForm.activeJob,
    }
    this.jobFormValue.emit(this.createdJob);
  }

  // Removes a skill in the skills array according to
  // the index of the selected skill.
  removeSkill(skill) {

    var index = this.skills.indexOf(skill)

    for (var i = 0; i < this.skills.length; i++) {
      if (i === index) {
        this.skills.splice(i, 1);
      }
    }
  }

  // Adds the input value to the skills array when the 'Add Skill'
  // button is pressed.
  addSkillToList() {
    this.skills.push(new Skill(this.skillInput, this.DEFAULT_REQ, this.skillWeight));
    this.skillInput = ""
    // Refocus cursor to input box.
    document.getElementById("skillInputBox").focus();
  }

  // Changes the value of the skill requirement according to 'Requirement' 
  // checkbox changes. The value is a boolean.
  changeRequirement(skill, event) {

    var index = this.skills.indexOf(skill)

    for (var i = 0; i < this.skills.length; i++) {
      if (i === index) {
        skill.Required = event.checked
      }
    }
  }

  // Changes the value of the weight of the skill according to 'Weight' 
  // slider value changes. The value is a number 0-4.
  changeWeight(skill, event) {

    var index = this.skills.indexOf(skill);

    for (var i = 0; i < this.skills.length; i++) {
      if (i === index) {
        skill.Weight = event.value
      }
    }
  }

  initializeForm(job){

    this.jobInfoForm.get('jobName').setValue(job.jobName);
    this.jobInfoForm.controls['jobCategory'].setValue(job.jobCategory, { onlySelf: true });
    this.jobInfoForm.controls['jobType'].setValue(job.jobType, { onlySelf: true });
    this.jobInfoForm.get('jobDescription').setValue(job.description);
    this.jobInfoForm.controls['jobStatus'].setValue(job.jobStatus, { onlySelf: true });

    // this.jobService.setCurrentJobId(job.jobId);
    // this.openModal(content);
  }
}
