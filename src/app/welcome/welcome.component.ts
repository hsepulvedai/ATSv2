/*This is the main page for applicants. Welcome them to the site and then allows them to go 
  to the page that shows all the available jobs or to the application pages for the 3 latest jobs */

import { Component, OnInit } from '@angular/core';
import { JobService } from '../shared/services/job.service';
import { IJob } from '../shared/models/job.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
jobs:IJob[]
  constructor(private jobService:JobService) { }
 
  ngOnInit() {
    this.jobService.universalSearch('_', 1, 3)
        .subscribe((data: IJob[]) => {
          this.jobs = data['Data'];
        });
  }
}
