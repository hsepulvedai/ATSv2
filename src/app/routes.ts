import { Routes } from '@angular/router'


import { HrTasksComponent } from './c-candidate-management/hr/hr-tasks/hr-tasks.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HrApplicantProfileComponent } from './c-candidate-management/hr/hr-applicant-profile/hr-applicant-profile.component'
import { OfferListComponent } from './a-applicant-section/offer/offer-list/offer-list.component';
import { EditApplicantComponent } from './applicant/edit-applicant/edit-applicant.component';
import { MaintenanceApplicantComponent } from './applicant/maintenance-applicant/maintenance-applicant.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { MaintenanceUsersComponent } from './user/maintenance-user/maintenance-user.component';
import { OfferListManagementComponent } from './b-applicant-management/offer/offer-list-management/offer-list-management.component';
import { HrOfferDetailComponent } from './b-applicant-management/offer/hr-offer-detail/hr-offer-detail.component';
import { OfferApplicationComponent } from './a-applicant-section/offer/offer-application/offer-application.component';
import { OfferTrackingComponent } from './a-applicant-section/offer/offer-tracking/offer-tracking.component';
import { OfferMaintenanceComponent } from './a-applicant-section/offer/offer-maintenance/offer-maintenance.component';
import { ApplicantMaintenanceComponent } from './c-candidate-management/applicant/applicant-maintenance/applicant-maintenance.component';
export const appRoutes: Routes = [
    
    { path: 'jobs', component: OfferListComponent },
  
    { path: 'editApplicant', component: EditApplicantComponent},
    { path: 'applicants/maintenance', component: MaintenanceApplicantComponent},
    
    { path: 'createUser', component: CreateUserComponent},
    { path: 'users/userMaintenance', component: MaintenanceUsersComponent},

    {path: 'offer-application', component: OfferApplicationComponent},
    {path: 'offer-list-management', component: OfferListManagementComponent},
    {path: 'hr-offer-detail', component: HrOfferDetailComponent},
    {path: 'offer-tracking', component: OfferTrackingComponent},
    {path: 'offer-maintenance', component: OfferMaintenanceComponent},
    {path: 'applicant-maintenance', component: ApplicantMaintenanceComponent},

    
    { path: 'hr-tasks', component: HrTasksComponent},
    { path: 'welcome', component: WelcomeComponent},
    { path: 'hr-applicant-profile', component: HrApplicantProfileComponent},
    { path: '', redirectTo: 'welcome', pathMatch: 'full'}
    
]