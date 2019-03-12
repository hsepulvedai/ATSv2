import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/shared/services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IJob } from 'src/app/shared/models/job.model';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Skill } from 'src/app/shared/models/skill';


@Component({
  selector: 'app-offer-info',
  templateUrl: './offer-info.component.html',
  styleUrls: ['./offer-info.component.css']
})
export class OfferInfoComponent implements OnInit {

  constructor(private jobService: JobService, private route: ActivatedRoute,
    private router: Router, private modalService: ModalService) { }

  closeResult: string;

  job: IJob
  jobLoaded: Promise<any>

  reqSkills: Skill[] = []
  otherSkills: Skill[] = []

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id');

    this.jobService.showJobOfferDetail(id)
      .subscribe((data: IJob) => {
        this.job = data['Data'][0];
        console.log(this.job)
        console.log(this.job.company)
        if (this.job.jobSkills != null)
          this.loadSkills()

        if (this.job == undefined)
          this.router.navigate(['jobs'])
        // Setting the Promise as resolved after I have the needed data
        // to allow loading data into DOM
        this.jobLoaded = Promise.resolve(true);
      });


  }

  openModal(content) {
    this.modalService.openModal(content);
  }

  loadSkills() {
    var str = this.job.jobSkills
    var str2 = str.split(',')

    for (var i = 0; i < str2.length; i++) {

      var req;
      var title;
      var weight;

      if (str2[i].split(';')[0] === '@') {
        req = true;
        title = str2[i].split(';')[1];
        weight = parseInt(str2[i].split(';')[2]);
        this.reqSkills.push(new Skill(title, req, weight / 25));

      }
      else {
        req = false;
        title = str2[i].split(';')[0];
        weight = parseInt(str2[i].split(';')[1]);
        this.otherSkills.push(new Skill(title, req, weight / 25));
      }
    }
  }
}
