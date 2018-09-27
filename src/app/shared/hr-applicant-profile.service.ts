import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../src/environments/environment';

import { IHRApplicant } from '../shared/models/IHRApplicant.model'

@Injectable({
  providedIn: 'root'
})
export class HrApplicantProfileService {

  currentApplicant: IHRApplicant
  routePrefix = 'Applicant'
  routePrefix2 = 'ApplicationAction'




  constructor( private http:HttpClient) { }

    getHRApplicantInfo(id:number) {
      return this.http.get(environment.baseUrl + this.routePrefix + '/ApplicantShowHRInfo/' + id)
    }

    // editApplicationHR(id:number) {

    // }

    getApplicationActionsHR(id:number) {
      return this.http.get(environment.baseUrl + this.routePrefix2 + '/ApplicationActionHRShow/' + id)
    }

    getAllApplicationActions(){
      return this.http.get(environment.baseUrl + '/ActionType/ActionTypeShowAll' )
    }

}
