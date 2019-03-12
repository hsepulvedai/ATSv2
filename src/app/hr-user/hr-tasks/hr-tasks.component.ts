import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-hr-tasks',
  templateUrl: './hr-tasks.component.html',
  //styleUrls: ['./hr-tasks.component.css']
})
export class HrTasksComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() { }

}
