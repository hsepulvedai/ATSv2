/*This is the main page for applicants. Welcome them to the site and then allows them to go to the page that
shows all the available jobs or to the application pages for the 3 latest jobs */
import { Component, OnInit } from '@angular/core';
import { IJobOfferHR } from '../shared/models/job-offer-hr.model';
import { IJobOffer } from '../shared/models/job-offer.model';
import { JobService } from '../shared/services/job.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})


export class WelcomeComponent implements OnInit {
jobs:IJobOffer[]
  constructor(private jobService:JobService, private router: Router,
  ) { }
 
  ngOnInit() {
    this.jobService.universalSearch('_', 1, 3)
        .subscribe((data: IJobOffer[]) => {
          this.jobs = data['Data'];
        })
  }
  applyButtonClicked(jobId: number) {

    this.jobService.currentJobId = jobId;
    this.router.navigate(['offer-application'])

  }



}
