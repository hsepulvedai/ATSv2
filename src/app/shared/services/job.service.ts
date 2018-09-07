import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http'
import { IJob } from '../../shared/models/job.model'

import { environment } from '../../../environments/environment';
import { IJobUpdate } from '../models/job_update.model';

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


  updateJob(job){
    return this.http.put(environment.baseUrl + this.routePrefix + 'JobEditAll', job )
  }

  // Sorting
  sortByJobTitleAsc(){
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveTitleAZ')
  }

  sortByJobTitleDesc(){
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveTitleAZ')
  }

  // Sorting and sorting

  sortByCompanyAsc(){
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveCompanyAZ')
  }

  sortByCompanyDesc(){
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveCompanyZA')
  }

  sortByJobLocationCityAsc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveLocationCityAZ')
  }

  sortByJobLocationCityDesc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveLocationCityZA')
  }

  sortByJobLocationCountryAsc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveLocationCountryAZ')
  }

  sortByJobLocationCountryDesc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveLocationCountryZA')
  }

  sortByJobCateogoryAsc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveCategoryAZ')
  }

  sortByJobCateogoryDesc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveCategoryZA')
  }

  sortByJobTypeAsc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveTypeAZ')
  }

  sortByJobTypeDesc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveTypeZA')
  }

  universalSearch(keyword){
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobUniversalSearch/search=' + keyword)
}

  universalSearchSortAsc(keyword, sortBy){
        return this.http.get(environment.baseUrl + this.routePrefix 
          + 'JobUniversalSearchSortAZ/search=' + keyword + 'sortBy=' + sortBy)
  }

  universalSearchSortDesc(keyword, sortBy){
    return this.http.get(environment.baseUrl + this.routePrefix
      + 'JobUniversalSearchSortZA/search=' + keyword + 'sortBy=' + sortBy)
  }

}


