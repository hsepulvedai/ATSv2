import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferApplicationComponent } from './offer-application.component';

describe('OfferApplicationComponent', () => {
  let component: OfferApplicationComponent;
  let fixture: ComponentFixture<OfferApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
