import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceUserComponent } from './maintenance-user.component';

describe('MaintenanceUserComponent', () => {
  let component: MaintenanceUserComponent;
  let fixture: ComponentFixture<MaintenanceUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
