import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrTasksComponent } from './hr-tasks.component';

describe('HrTasksComponent', () => {
  let component: HrTasksComponent;
  let fixture: ComponentFixture<HrTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
