import { Injectable } from '@angular/core';
import { ICompany } from '../models/company.model'
import { HttpClient } from '@angular/common/http'

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  routePrefix = 'Company'

  constructor(private http:HttpClient) { }

  getActiveCompanyEmployees(companyId) {
    return this.http.get(environment.baseUrl + this.routePrefix + '/EmployeeSelectAllFromCompany/' + companyId);
  }

  getCompanyById(id:number) {
    return this.http.get(environment.baseUrl + this.routePrefix + '/CompanySelectById/' + id)
  }

  

  

}
