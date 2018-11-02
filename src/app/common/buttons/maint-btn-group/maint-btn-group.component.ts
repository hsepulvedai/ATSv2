import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'maint-btn-group',
  templateUrl: './maint-btn-group.component.html',
  styleUrls: ['./maint-btn-group.component.css']
})
export class MaintBtnGroupComponent implements OnInit {

  @Input()
  size:number

  @Input()
  id

  @Input()
  btnType

  @Input()
  btnClass


  numberOfButtons:number[]

  constructor() { }

  ngOnInit() {
    this.numberOfButtons = Array(this.size).fill(0);
  }

}
