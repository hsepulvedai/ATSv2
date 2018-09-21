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
    return this.http.post(environment.baseUrl + this.routePrefix + '/ApplicationInsertFromWeb/Submitted', application)
  }


}
