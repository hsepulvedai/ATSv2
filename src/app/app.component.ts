/*This  component is only used for the code for the navbar and for the footer */
import { Component } from '@angular/core';
import { Router } from '@angular/router'


import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ats';

  constructor( private modalService: NgbModal ) { }

closeResult 
  
// open(content) {
//   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
//     this.closeResult = `Closed with: ${result}`;
//   }, (reason) => {
//     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//   });
// }

// private getDismissReason(reason: any): string {
//   if (reason === ModalDismissReasons.ESC) {
//     return 'by pressing ESC';
//   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//     return 'by clicking on a backdrop';
//   } else {
//     return  `with: ${reason}`;
//   }
// }
 
}

