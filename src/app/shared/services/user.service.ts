import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { IUser } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser:IUser

  routePrefix = 'Users'

  constructor(private http:HttpClient) { }

  getAllUsers() {
    return this.http.get(environment.baseUrl + this.routePrefix + '/UsersSelectAll');
  }

  insertUser(newApplicant:IUser){
    
    return this.http.post(environment.baseUrl + this.routePrefix + '/UsersInsert'
      , newApplicant).subscribe(
           data => {console.log("POST: ", data)},
           error => {console.log("Error", error)}
                      );
  }

  insertApplicantUser(newApplicant:IUser) {

    return this.http.post(environment.baseUrl + this.routePrefix + '/UserApplicantInsert'
    , newApplicant).subscribe(
         data => {console.log("POST: ", data)},
         error => {console.log("Error", error)}
                    );
  }

  getUserById(id:number){
    
    return this.http.get( environment.baseUrl + this.routePrefix + '/UsersSelectById/'+ id);

  }

}
