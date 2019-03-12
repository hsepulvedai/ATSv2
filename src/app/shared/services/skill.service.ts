import { Injectable } from '@angular/core';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor() { }


  skillParse(jobSkills): Skill[] {

    var skillArray:Skill[] = []

    var str = jobSkills
    var str2 = str.split(',')

    for (var i = 0; i < str2.length; i++) {

      var req;
      var title;
      var weight;

      if (str2[i].split(';')[0] === '@') {
        req = true;
        title = str2[i].split(';')[1];
        weight = parseInt(str2[i].split(';')[2]);
      }
      else {
        req = false;
        title = str2[i].split(';')[0];
        weight = parseInt(str2[i].split(';')[1]);
      }

      skillArray.push(new Skill(title, req, weight / 25));
    }

    return skillArray;
  }





}
