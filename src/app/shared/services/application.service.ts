import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  routePrefix = 'Application'

  constructor(private http:HttpClient) { }

  updateApplicationStatus(applicationId, applicationStatusId) {
    return this.http.patch(environment.baseUrl + this.routePrefix + '/ApplicantSelectAll', applicationId, applicationStatusId);
  }

  getApplicationStatusByEmail(email){
    return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicationSelectStatusByEmail', email )
  }

  getAllApplicationStatus(){
    return this.http.get(environment.baseUrl + '/ApplicationStatus/ApplicationStatusSelectActive' )
  }


  getCount(id){
    return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicationCountById/'+ id )
  }

  insertApplication(application) {
    return this.http.post(environment.baseUrl + this.routePrefix + '/ApplicationInsertFromWeb', application)
  }

  getAllApplicationByRecruiter(recruiterId){
    return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicationShowAllByRecruiterId/'+ recruiterId)
  }

  getAllTasksByAppIdAndStatus(applicationId, status){
    return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicationShowPendingTaskByAppId/' + applicationId  + '/status=' +  status)
  }


  universalSearch(recruiterId:number, keyword: string, pageNumber: number, pageSize: number) {
    if (keyword === '')
      keyword = '_'
    return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicationUniversalSearchByRecruiterId/' + recruiterId + '/search='
      + keyword + "/pageNumber=" + pageNumber + "/pageSize=" + pageSize)
  }

  universalSearchCount(recruiterId:number, keyword: string, pageNumber: number, pageSize: number) {
    if (keyword === '')
      keyword = '_'
    return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicationUniversalSearchCountByRecruiterId/' + recruiterId + '/search='
      + keyword + "/pageNumber=" + pageNumber + "/pageSize=" + pageSize)
  }


 



}
