import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrOfferDetailComponent } from './hr-offer-detail.component';

describe('HrOfferDetailComponent', () => {
  let component: HrOfferDetailComponent;
  let fixture: ComponentFixture<HrOfferDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrOfferDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrOfferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
