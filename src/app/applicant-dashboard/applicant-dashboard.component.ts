import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/shared/services/application.service';
import { IApplication } from 'src/app/shared/models/application.model';
import { JobService } from 'src/app/shared/services/job.service';
import { IJob } from 'src/app/shared/models/job.model';
import { IApplicant } from 'src/app/shared/models/applicant.model';
import { ApplicantService } from 'src/app/shared/services/applicant.service';

@Component({
  selector: 'app-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.css']
})
export class ApplicantDashboardComponent implements OnInit {

  constructor(private applicationService: ApplicationService, 
    private jobService: JobService, private applicantService:ApplicantService) { }

  currentApplicant:IApplicant = {}
  applicantLoaded:Promise<any>

  applications: IApplication
  applicationsLoaded: Promise<any>

  selectedJobInfo: IJob
  jobLoaded: Promise<any>
  selectedApplication

  test = 'kek'

  ngOnInit() {

    this.applicantService.showApplicantById(3)
    .subscribe(data => {
      this.currentApplicant = data['Data'];
      console.log(this.currentApplicant)
      this.applicantLoaded = Promise.resolve(true);
    });

    this.applicationService.getAllApplicationByApplicant(3).subscribe(data => {
      this.applications = data['Data'];
      this.applicationsLoaded = Promise.resolve(true);
    });

      // this.jobService.showJobById(1).subscribe(data => {
      //   this.selectedJobInfo = data['Data'];
      //   console.log(this.selectedJobInfo);
      //   this.jobLoaded = Promise.resolve(true)
      // });

  }

  selectJob(id: number) {
    this.jobService.showJobById(id).subscribe(data => {
      this.selectedJobInfo = data['Data'];
      console.log(this.selectedJobInfo);
      this.jobLoaded = Promise.resolve(true)
    });
  }

}
