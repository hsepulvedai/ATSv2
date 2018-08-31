import { Component, OnInit } from '@angular/core';
import { IApplicant } from '../../../shared/models/applicant.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicantService } from '../../../shared/services/applicant.service';
import { IApplicantInfo } from '../../../shared/models/applicant_info.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-applicant-maintenance',
  templateUrl: './applicant-maintenance.component.html',
  //styleUrls: ['./applicant-maintenance.component.css']
})
export class ApplicantMaintenanceComponent implements OnInit {

  allApplicants: IApplicantInfo[]
  allPastApplicants: IApplicantInfo[]
  applicant: IApplicantInfo
  addApplicantForm:FormGroup
  applicantName: FormControl


  constructor(
    private router: Router,
    private applicantService: ApplicantService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.applicantName = new FormControl()
    

    this.addApplicantForm = new FormGroup({
      applicantName: this.applicantName
    })

    this.applicantService.showAllActiveApplicants()
    .subscribe((data:IApplicantInfo[]) => {
      this.allApplicants = data['Data'];
     }) 

     this.applicantService.showAllInactiveApplicants()
     .subscribe((data:IApplicantInfo[]) => {
       this.allPastApplicants = data['Data'];
      }) 

  }

  makeApplicantInactive(id) {
    this.applicantService.setInactiveApplicant(id)
    .subscribe(data => { console.log("Patched:" + data) },
    error => { console.error("Error: ", error) })
  }

  makeApplicantActive(id) {
    this.applicantService.setActiveApplicant(id)
    .subscribe(data => { console.log("Patched:" + data) },
    error => { console.error("Error: ", error) })
  }

}
