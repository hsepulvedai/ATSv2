import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../../src/environments/environment';
import { IUser } from '../shared/models/user.model';

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
  
  getUserById(id:number){
    
    return this.http.get( environment.baseUrl + this.routePrefix + '/UsersSelectById/'+ id);

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

  // updateApplicant(updatedApplicant:IApplicant){

  //   return this.http.put( environment.baseUrl + "", updatedApplicant).subscribe(
  //          data => {console.log("UPDATED: ", data)},
  //          error => {console.log("Error", error)}
  //                     );
  // }   

  // setActiveAddress(id:number){
  //   return this.http.put( environment.baseUrl + "", id).subscribe(
  //     data => {console.log("UPDATED: ", data)},
  //     error => {console.log("Error", error)}
  //                );

  // }


      
  // setIActiveAddress(id:number){
  //   return this.http.put(environment.baseUrl + "", id).subscribe(
  //     data => {console.log("UPDATED: ", data)},
  //     error => {console.log("Error", error)}
  //                );
  
  // }
}
