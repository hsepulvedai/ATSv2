import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTrackingComponent } from './offer-tracking.component';

describe('OfferTrackingComponent', () => {
  let component: OfferTrackingComponent;
  let fixture: ComponentFixture<OfferTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
