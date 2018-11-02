import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintJobFormComponent } from './maint-job-form.component';

describe('MaintJobFormComponent', () => {
  let component: MaintJobFormComponent;
  let fixture: ComponentFixture<MaintJobFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintJobFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintJobFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
