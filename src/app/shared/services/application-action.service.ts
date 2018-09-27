import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApplicationActionService {

  routePrefix = 'ApplicationAction'

  currentAction

  constructor(private http:HttpClient) { }

  getAllApplicationActions(id, pageNumber, pageSize) {
    return this.http.get(environment.baseUrl +  this.routePrefix + '/ApplicationActionTimeLine/' + id
    + '/pageNumber=' + pageNumber + '/pageSize=' + pageSize)
  }

  countApplicationActions(id) {
    return this.http.get(environment.baseUrl +  this.routePrefix + '/ApplicationActionTimeLineCount/' + id)
  }

  insertAction(action){
    return this.http.post(environment.baseUrl + this.routePrefix + '/ApplicationActionInsertFromWeb/', action )
  }

  editAction(action){
    return this.http.patch(environment.baseUrl + this.routePrefix + '/ApplicationActionEditAll', action)
  }

  getAllApplicationTypes(){
    return this.http.get(environment.baseUrl + '/ActionType/ActionTypeShowAll')
  }

  getAllApplicationStatuses(){
    return this.http.get(environment.baseUrl + '/ActionStatus/ActionStatusShowAll')
  }


  


}
