import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobService } from './job.service';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {

  constructor(private jobService:JobService, private pagination:PaginationService) { }

  private jobSubscription: Subscription = new Subscription();
  private jobTotalSubscription: Subscription = new Subscription();
  private jobInactiveSubscription: Subscription = new Subscription();
  private jobInactiveTotalSubscription: Subscription = new Subscription();
  private draftSubscription: Subscription = new Subscription();
  private draftTotalSubscription: Subscription = new Subscription();


  refreshJobData() {

  //   if (searchBarInput === undefined) {

  //     this.jobService.universalSearch('_', 1, this.pagination.pageSize)
  //       .subscribe((data: IJobOffer[]) => {
  //         this.jobs = data['Data'];
  //         this.sortedData = this.jobs
  //       })


  //   }
  //   else {
  //     if (this.title === 'Available Jobs')

  //     this.jobService.universalSea, page, this.pagination.pageSize)
  //       .subscribe((data: IJobOffer[]) => {
  //         this.jobs = data['Data'];
  //         this.sortedData = this.jobs
  //       })

  }
}
