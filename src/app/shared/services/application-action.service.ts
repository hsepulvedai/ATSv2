import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApplicationActionService {

  routePrefix = 'ApplicationAction'

  constructor(private http:HttpClient) { }

  getAllApplicationActions(id, pageNumber, pageSize) {
    return this.http.get(environment.baseUrl +  this.routePrefix + '/ApplicationActionTimeLine/' + id
    + '/pageNumber=' + pageNumber + '/pageSize=' + pageSize)
  }

  countApplicationActions(id) {
    return this.http.get(environment.baseUrl +  this.routePrefix + '/ApplicationActionTimeLineCount/' + id)
  }

  


}
