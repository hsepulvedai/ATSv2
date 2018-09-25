import { Component, OnInit } from '@angular/core';
import { IJobOfferHR } from '../shared/models/job-offer-hr.model';
import { IJobOffer } from '../shared/models/job-offer.model';
import { JobService } from '../shared/services/job.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  //styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
jobs:IJobOffer[]
  constructor(private jobService:JobService) { }
 
  ngOnInit() {
    this.jobService.universalSearch('_', 1, 3)
        .subscribe((data: IJobOffer[]) => {
          this.jobs = data['Data'];
         console.log(this.jobs[0]);
        })
  }

}
