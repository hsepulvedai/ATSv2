import { Injectable } from '@angular/core'
import { IUser } from '../models/user.model';
import { UserService } from '../services/user.service';

// import { first } from '../../../node_modules/rxjs/operators';

@Injectable ()
export class AuthService { 

  constructor(private userService:UserService ) {}

    currentUser:IUser

    loginUser (userName: string, password: string) {

    //  this.currentUser = {
    //      id: 1,
    //      email:userName,
    //      firstName: 'John',
    //      lastName: 'Papa'
    //  }  

      this.userService.getUserById(1)
      .subscribe((data: IUser) => {
      this.currentUser = data['Data']})
      }

    isAuthenticated() {
        return !!this.currentUser;
    }
    
    updateCurrentUser(firstName:string, lastName:string){
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName

    }
}
