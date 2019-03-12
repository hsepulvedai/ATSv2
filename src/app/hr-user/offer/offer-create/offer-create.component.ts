import { Component, OnInit, Input } from '@angular/core';
import { JobService } from 'src/app/shared/services/job.service';
import { Router } from '@angular/router';


/* This component is used for the creation of a job listing using the 
JobInfoForm component. */
@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.css']
})
export class OfferCreateComponent implements OnInit {

  constructor(private jobService: JobService, private router:Router) { }

  ngOnInit() { }

  createJob(newJob) {
      this.jobService.addJobMaintenance(newJob)
      .subscribe(data => {
        this.router.navigate(['/home/hr']);  // TODO: Change to navigate to a better fitting page
        alert('Job was added');
      }, error => { console.error("Error: ", error) })
  }

  createDraft(newJob) {
    this.jobService.addDraft(newJob)
    .subscribe(data => {
      this.router.navigate(['/home/hr']);  // TODO: Change to navigate to a better fitting page
      alert('Draft was created');
    }, error => { console.error("Error: ", error) })
  }
 
}
