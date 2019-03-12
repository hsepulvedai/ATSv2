import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferMaintenanceComponent } from './offer-maintenance.component';

describe('OfferMaintenanceComponent', () => {
  let component: OfferMaintenanceComponent;
  let fixture: ComponentFixture<OfferMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
