import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { IUser } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Information of a dummy User that exists within the database
  // It emulates a logged in applicant user
  currentUser:IUser = {
    id:14,
    firstName: 'Stuart',
    lastName: 'Little',
    email: 'slittle@gmail.com',
    password: 'mousepower',
    phone: '115-995-9999',
    roleId: 3,
    active: true
  }

  // // Information of a dummy User that exists within the database
  // // It emulates a logged in recuiter user
  // currentUser:IUser = {
  //   id: 9,
  //   firstName: 'Albert',
  //   lastName: 'Einstein',
  //   email: 'einst@gmail.com',
  //   password: 'eequalsmcsquare',
  //   phone: 'jjj1233',
  //   roleId: 4,
  //   active: true
  // }

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
