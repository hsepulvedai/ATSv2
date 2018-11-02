import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintBtnGroupComponent } from './maint-btn-group.component';

describe('MaintBtnGroupComponent', () => {
  let component: MaintBtnGroupComponent;
  let fixture: ComponentFixture<MaintBtnGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintBtnGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintBtnGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
