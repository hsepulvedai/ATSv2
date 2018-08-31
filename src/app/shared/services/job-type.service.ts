import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'



import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class JobTypeService {

  routePrefix = "JobType"

  constructor( private http:HttpClient) { }

   
  showTypes(){
    return this.http.get(environment.baseUrl + this.routePrefix + "/JobTypeSelectActive")
  }



}
