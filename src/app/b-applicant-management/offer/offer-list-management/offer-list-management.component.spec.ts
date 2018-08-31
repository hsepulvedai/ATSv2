import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferListManagementComponent } from './offer-list-management.component';

describe('OfferListManagementComponent', () => {
  let component: OfferListManagementComponent;
  let fixture: ComponentFixture<OfferListManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferListManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferListManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
