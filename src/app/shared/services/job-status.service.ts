import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobStatusService {

  routePrefix = "JobStatus"

  constructor(private http: HttpClient) {}


getJobStatusById(id){
  return this.http.get(environment.baseUrl + this.routePrefix+ "/JobStatusSelectById/" + id)
}

  showAllStatus(){
    return this.http.get(environment.baseUrl + this.routePrefix + "/JobStatusSelectAll");
  }
}
