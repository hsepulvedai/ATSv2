import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { IJob } from '../../shared/models/job.model'

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

   currentJob: IJob
   currentJobId:number

   routePrefix = "Job/"

   constructor(private http: HttpClient) { }

   showAvalaibleJobs() {
      return this.http.get(environment.baseUrl + this.routePrefix + "JobShowAllActive")
   }

  showPastJobs() {
      return this.http.get(environment.baseUrl + this.routePrefix + "JobShowAllInactive")
   }

  showJobOfferDetail(id) {
    return this.http.get(environment.baseUrl + this.routePrefix + "JobShowById/" + id)
  }

  showJobById(id) {
    return this.http.get(environment.baseUrl + this.routePrefix + "JobShowById/" + id)
  }

  showDraftJobs() {
    return this.http.get(environment.baseUrl + this.routePrefix + "JobShowAllDrafts/")
  }

  // Change to application
  getStatusByEmail(email){
    return this.http.get(environment.baseUrl + this.routePrefix + "getStatusByEmail/" + email)
  }
  
    setActiveJob(id:number){
    return this.http.patch(environment.baseUrl + this.routePrefix + "JobSetActive/" + id, id)

  }

  setInactiveJob(id:number){
    return this.http.patch(environment.baseUrl + this.routePrefix + "JobSetInactive/" + id, id)

  }

  addJobMaintenance(job) {
    return this.http.post(environment.baseUrl + this.routePrefix + 'JobInsertFromWeb', job )
  }

}


