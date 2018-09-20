import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { IHRApplication } from '../../shared/models/hr-application.model';
import { ApplicationService } from '../../shared/services/application.service';


@Component({
  selector: 'app-maintenance-user',
  templateUrl: './maintenance-user.component.html',
  //styleUrls: ['./maintenance-user.component.css']
})
export class MaintenanceUserComponent implements OnInit {


    applications: IHRApplication[]
    application: IHRApplication
    sortedData: IHRApplication[]

    recruiterId:number


  constructor(
      private router: Router,
     private applicationService: ApplicationService
      , private route: ActivatedRoute
  ) {
  }

  ngOnInit() {

//  this.applicationService.getAllApplicationByRecruiter(this.recruiterId)
//     .subscribe((data:IHRApplication[]) => {
//      this.applications = data['Data'];})
     
    
    
  }

  
}

