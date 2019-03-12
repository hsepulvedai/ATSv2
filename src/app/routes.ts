/*All Routes used in the project */
import { Routes } from '@angular/router'
import { TestComponent } from './test/test.component';
import { LoginComponent } from './user/login/login.component';
import { OfferMaintenanceComponent } from './hr-user/offer/offer-maintenance/offer-maintenance.component';
import { OfferCreateComponent } from './hr-user/offer/offer-create/offer-create.component';
import { OfferListComponent } from './applicant-user/offer/offer-list/offer-list.component';
import { OfferInfoComponent } from './hr-user/offer/offer-info/offer-info.component';
import { OfferApplicationComponent } from './applicant-user/offer/offer-application/offer-application.component';
import { ApplicantDashboardComponent } from './applicant-dashboard/applicant-dashboard.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { OfferListManagementComponent } from './hr-user/offer/offer-list-management/offer-list-management.component';
import { HrOfferDetailComponent } from './hr-user/offer/hr-offer-detail/hr-offer-detail.component';
import { HrApplicationListComponent } from './hr-user/hr-application-list/hr-application-list.component';
import { HrApplicantProfileComponent } from './hr-user/hr-applicant-profile/hr-applicant-profile.component';
import { OfferTrackingComponent } from './applicant-user/offer/offer-tracking/offer-tracking.component';
import { ApplicantMaintenanceComponent } from './maintenance/applicant-maintenance/applicant-maintenance.component';
import { HrTasksComponent } from './hr-user/hr-tasks/hr-tasks.component';
import { HrHomeComponent } from './hr-user/hr-home/hr-home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Error404Component } from './errors/404.component';


export const appRoutes: Routes = [

    { path:'test' , component: TestComponent},
    
    { path: 'login', component: LoginComponent},

    { path: 'jobs/maintenance', component: OfferMaintenanceComponent},
    { path: 'jobs/create', component: OfferCreateComponent },
    { path: 'jobs/submissions', component: OfferListManagementComponent},
    { path: 'jobs', component: OfferListComponent },
    { path: 'jobs/:id', component: OfferInfoComponent },
    { path: 'jobs/:id/apply', component: OfferApplicationComponent },
  
    { path: 'applicant', component: ApplicantDashboardComponent},
    
    { path: 'users/create', component: CreateUserComponent},

    { path: 'jobs/:id/submissions', component: HrOfferDetailComponent},

    { path: 'applications', component:HrApplicationListComponent },
    { path: 'applications/:id', component: HrApplicantProfileComponent},

    { path: 'offer-tracking', component: OfferTrackingComponent},
    { path: 'applicant-maintenance', component: ApplicantMaintenanceComponent},
 
    { path: 'hr/tasks', component: HrTasksComponent},
    { path: 'home/hr', component: HrHomeComponent },
    { path: 'welcome', component: WelcomeComponent},
    { path : '404', component: Error404Component },
    { path: '', redirectTo: 'welcome', pathMatch: 'full'},
    { path: '**', redirectTo: '404'}

]