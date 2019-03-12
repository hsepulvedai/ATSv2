
/*Everything used to make project work*/
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '../../node_modules/@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md'

import { RouterModule } from '@angular/router'
import {appRoutes} from './routes';
import { LoginComponent } from './user/login/login.component';
import { MaterialModule } from './modules/material.module'
import { TestComponent } from './test/test.component';
import { MaintenanceTabComponent } from './common/maintenance-tab.component';
import { LoginModalComponent } from './shared/modals/login-modal/login-modal.component';
import { EditModalComponent } from './shared/modals/edit-modal/edit-modal.component';
import { AddJobModalComponent } from './shared/modals/add-job-modal/add-job-modal.component';
import { HrApplicantProfileComponent } from './hr-user/hr-applicant-profile/hr-applicant-profile.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { OfferListManagementComponent } from './hr-user/offer/offer-list-management/offer-list-management.component';
import { HrTasksComponent } from './hr-user/hr-tasks/hr-tasks.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { OfferListComponent } from './applicant-user/offer/offer-list/offer-list.component';
import { HrOfferDetailComponent } from './hr-user/offer/hr-offer-detail/hr-offer-detail.component';
import { OfferApplicationComponent } from './applicant-user/offer/offer-application/offer-application.component';
import { OfferTrackingComponent } from './applicant-user/offer/offer-tracking/offer-tracking.component';
import { OfferMaintenanceComponent } from './hr-user/offer/offer-maintenance/offer-maintenance.component';
import { ApplicantMaintenanceComponent } from './maintenance/applicant-maintenance/applicant-maintenance.component';
import { Error404Component } from './errors/404.component';
import { ApplicantDashboardComponent } from './applicant-dashboard/applicant-dashboard.component';
import { HrHomeComponent } from './hr-user/hr-home/hr-home.component';
import { HrApplicationListComponent } from './hr-user/hr-application-list/hr-application-list.component';
import { OfferCreateComponent } from './hr-user/offer/offer-create/offer-create.component';
import { OfferInfoComponent } from './hr-user/offer/offer-info/offer-info.component';
import { JobEditModalComponent } from './common/modals/job-edit-modal/job-edit-modal.component';
import { JobInfoFormComponent } from './shared/forms/job-info-form/job-info-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    HrApplicantProfileComponent,
    HrTasksComponent,
    OfferListManagementComponent,
    WelcomeComponent,
    OfferListComponent,
    HrOfferDetailComponent,
    OfferApplicationComponent,
    OfferTrackingComponent,
    OfferMaintenanceComponent,
    ApplicantMaintenanceComponent,
    Error404Component,
    LoginComponent,
    TestComponent,
    MaintenanceTabComponent,
    LoginModalComponent,
    EditModalComponent,
    AddJobModalComponent,
    ApplicantDashboardComponent,
    HrHomeComponent,
    HrApplicationListComponent,
    OfferCreateComponent,
    OfferInfoComponent,
    JobEditModalComponent,
    JobInfoFormComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    FormsModule,
    CdkTableModule,
    CdkTreeModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
})
export class AppModule { }
