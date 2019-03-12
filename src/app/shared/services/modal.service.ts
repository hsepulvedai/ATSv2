import { Injectable } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: any[] = [];
  closeResult: string
  activeModal:NgbActiveModal;

  constructor(private modalService: NgbModal) { }

  openModal(content) {
    this.activeModal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-add', size: 'lg' })
    // .result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  closeModal() {
    this.activeModal.close();
  }

}
