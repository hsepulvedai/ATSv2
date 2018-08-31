import { Component, OnInit } from '@angular/core';
import { IUser } from '../../shared/models/user.model'
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-maintenance-user',
  templateUrl: './maintenance-user.component.html',
  //styleUrls: ['./maintenance-user.component.css']
})
export class MaintenanceUsersComponent implements OnInit {
  users: IUser[]
  user:IUser


  constructor(
      private router: Router,
      private userService: UserService
      , private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
      this.userService.getAllUsers()
          .subscribe((data:IUser[]) => {
              this.users = data['Data'];
          })
  }

  

  // goToProfile(userId) {  
  //     this.userService.getUserById(userId)
  //         .subscribe((data:IUser) => {
  //             this.user = data['Data'];
  //             this.userService.currentUser = this.user
  //             this.router.navigate(['employeeForm'])
  //         })
  // }

}
