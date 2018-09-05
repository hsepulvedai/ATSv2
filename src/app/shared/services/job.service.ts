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
    return this.http.get(environment.baseUrl + this.routePrefix + "JobShowOfferDetail/" + id)
  }

  showJobById(id) {
    return this.http.get(environment.baseUrl + this.routePrefix + "JobShowById/" + id)
  }

  showDraftJobs() {
    return this.http.get(environment.baseUrl + this.routePrefix + "JobShowAllDrafts/")
  }

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

  // getAllActiveApplicationStatus() {
  //   return this.http.get(environment.baseUrl + "" + "/")
  // }

  setInActiveJob(id:number){
    return this.http.patch(environment.baseUrl + this.routePrefix+ "JobSetInactive/" + id, id)
  }

   insertJob(newJob:IJob){

    return this.http.post( environment.baseUrl + this.routePrefix + "JobCompleteInsert/", newJob).subscribe(
          data => {console.log("POST: ", data)},
           error => {console.log("Error", error)}
                      );
  }
  
  // updateJob(updatedJob:IJob){

  //   return this.http.put( environment.baseUrl + "/Job/Modify/", updatedJob).subscribe(
  //          data => {console.log("UPDATED: ", data)},
  //          error => {console.log("Error", error)}
  //                     );
  // }


  // getJobs(){
  //  return this.http.get(environment.baseUrl + "/Job/JobShowAll/");
  // }

  

  
  // getActiveJobs(){
  //   return this.http.get(environment.baseUrl + "/Job/JobSelectActive/");
  //  }  

   
  // getInactiveJobs(){
  //   return this.http.get(environment.baseUrl + "/Job/JobSelectInactive/");
  //  }


     





}


