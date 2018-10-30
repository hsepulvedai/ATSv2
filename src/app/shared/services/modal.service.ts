import { Injectable } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';




@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: any[] = [];
  closeResult:string

  constructor(private modalService:NgbModal) { }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-add', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

//   add(modal: any) {
//     // add modal to array of active modals
//     this.modals.push(modal);
// }

// remove(id: string) {
//     // remove modal from array of active modals
//     let modalToRemove = _.findWhere(this.modals, { id: id });
//     this.modals = _.without(this.modals, modalToRemove);
// }

// open(id: string) {
//     // open modal specified by id
//     let modal = _.findWhere(this.modals, { id: id });
//     modal.open();
// }

// close(id: string) {
//     // close modal specified by id
//     let modal = _.find(this.modals, { id: id });
//     modal.close();
// }



}
