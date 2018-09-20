





import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';




@NgModule({
  exports: [
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ]
})
export class DemoMaterialModule {}


import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '../../node_modules/@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
import { MaintenanceUserComponent } from './user/maintenance-user/maintenance-user.component';
import { OfferListManagementComponent } from './b-applicant-management/offer/offer-list-management/offer-list-management.component';
import { HrOfferDetailComponent } from './b-applicant-management/offer/hr-offer-detail/hr-offer-detail.component';
import { OfferApplicationComponent } from './a-applicant-section/offer/offer-application/offer-application.component';
import { OfferTrackingComponent } from './a-applicant-section/offer/offer-tracking/offer-tracking.component';
import { OfferMaintenanceComponent } from './a-applicant-section/offer/offer-maintenance/offer-maintenance.component';
import { ApplicantMaintenanceComponent } from './c-candidate-management/applicant/applicant-maintenance/applicant-maintenance.component';
import {  SortOverviewExampleComponent } from './a-applicant-section/offer/TestingMaterial/sort-overview-example/sort-overview-example.component';


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
    SortOverviewExampleComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    DemoMaterialModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
