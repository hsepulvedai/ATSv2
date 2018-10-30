/*This  component is only used for the code for the navbar and for the footer */
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router'


import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { LoginModalComponent } from './shared/modals/login-modal/login-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ats';

  constructor(private modalService: NgbModal) { }

  openLogin() {

    // Get the modal
    var modal = document.getElementById('loginModal');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  login() {

    // this.authService.login()
  }

}