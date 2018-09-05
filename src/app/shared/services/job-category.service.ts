import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'



import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobCategoryService {


  routePrefix = "JobCategory"

  constructor(private http: HttpClient) {}


getJobCategoryById(id){
  return this.http.get(environment.baseUrl + this.routePrefix+ "/JobCategorySelectById/" + id)
}

  showCategories(){
    return this.http.get(environment.baseUrl + this.routePrefix + "/JobCategorySelectActive");

  }
}
