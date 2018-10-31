import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferMaintenanceTableComponent } from './offer-maintenance-table.component';

describe('OfferMaintenanceTableComponent', () => {
  let component: OfferMaintenanceTableComponent;
  let fixture: ComponentFixture<OfferMaintenanceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferMaintenanceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferMaintenanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
