import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { ApplicationService } from '../../../shared/services/application.service';
import { IApplicationStatusInfo } from 'src/app/shared/models/application-status-info.model';


@Component({
  selector: 'app-offer-tracking',
  templateUrl: './offer-tracking.component.html',
  //styleUrls: ['./offer-tracking.component.css']ng
})
export class OfferTrackingComponent implements OnInit {

  closeResult: string;

  result: IApplicationStatusInfo[]

  trackForm: FormGroup
  email: FormControl

  constructor(private modalService: NgbModal, 
              private applicationService: ApplicationService) { }

  ngOnInit() {

    this.email = new FormControl();

    this.trackForm = new FormGroup({
      email: this.email
    })

    console.log(this.email)

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

   // this.applicationService.getApplicationStatusByEmail(this.email)
    // .subscribe((data: IApplicationStatusInfo[]) => {
    //   this.result = data['Data'];
     // })


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
