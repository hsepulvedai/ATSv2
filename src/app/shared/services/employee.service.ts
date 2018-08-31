import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  routePrefix = 'Employee'

  constructor(private http:HttpClient) { }

  getActiveCompanyEmployees(companyId) {
    return this.http.get(environment.baseUrl + this.routePrefix + '/EmployeeSelectAllFromCompany/' + companyId);
  }
}
