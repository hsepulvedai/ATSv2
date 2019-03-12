import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrApplicationListComponent } from './hr-application-list.component';

describe('HrApplicationListComponent', () => {
  let component: HrApplicationListComponent;
  let fixture: ComponentFixture<HrApplicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrApplicationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
