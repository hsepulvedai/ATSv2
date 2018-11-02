
/*Everything used to make project work*/
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '../../node_modules/@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md'


import { RouterModule } from '@angular/router'
import {appRoutes} from './routes';
import { HrTasksComponent } from './c-candidate-management/hr/hr-tasks/hr-tasks.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HrApplicantProfileComponent } from './c-candidate-management/hr/hr-applicant-profile/hr-applicant-profile.component'
import { OfferListComponent } from './a-applicant-section/offer/offer-list/offer-list.component';
import { EditApplicantComponent } from './applicant/edit-applicant/edit-applicant.component';
import { MaintenanceApplicantComponent } from './applicant/maintenance-applicant/maintenance-applicant.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { MaintenanceUserComponent } from './c-candidate-management/maintenance-user/maintenance-user.component';
import { OfferListManagementComponent } from './b-applicant-management/offer/offer-list-management/offer-list-management.component';
import { HrOfferDetailComponent } from './b-applicant-management/offer/hr-offer-detail/hr-offer-detail.component';
import { OfferApplicationComponent } from './a-applicant-section/offer/offer-application/offer-application.component';
import { OfferTrackingComponent } from './a-applicant-section/offer/offer-tracking/offer-tracking.component';
import { OfferMaintenanceComponent } from './a-applicant-section/offer/offer-maintenance/offer-maintenance.component';
import { ApplicantMaintenanceComponent } from './c-candidate-management/applicant/applicant-maintenance/applicant-maintenance.component';
import { Error404Component } from './errors/404.component';

import { LoginComponent } from './user/login/login.component';

import { MaterialModule } from './modules/material.module'
import { TestComponent } from './test/test.component';
import { MaintenanceTabComponent } from './common/maintenance-tab.component';
import { LoginModalComponent } from './shared/modals/login-modal/login-modal.component';
import { EditModalComponent } from './shared/modals/edit-modal/edit-modal.component';
import { AddJobModalComponent } from './shared/modals/add-job-modal/add-job-modal.component';
import { OfferMaintenanceTableComponent } from './common/tables/offer-maintenance-table/offer-maintenance-table.component';
import { MaintBtnGroupComponent } from './common/buttons/maint-btn-group/maint-btn-group.component';
import { MaintJobFormComponent } from './shared/forms/maint-job-form/maint-job-form.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    EditApplicantComponent,
    HrApplicantProfileComponent,
    HrTasksComponent,
    MaintenanceApplicantComponent,
    MaintenanceUserComponent,
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
    OfferMaintenanceTableComponent,
    MaintBtnGroupComponent,
    MaintJobFormComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    CdkTableModule,
    CdkTreeModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
