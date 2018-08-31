import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { JobService } from '../../../shared/services/job.service';

@Component({
  selector: 'app-offer-tracking',
  templateUrl: './offer-tracking.component.html',
  //styleUrls: ['./offer-tracking.component.css']ng
})
export class OfferTrackingComponent implements OnInit {

  closeResult: string;

  trackForm: FormGroup
  email: FormControl

  constructor(private modalService: NgbModal, 
              private jobService: JobService) { }

  ngOnInit() {

    this.email = new FormControl();

    this.trackForm = new FormGroup({
      email: this.email
    })


  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }

}
