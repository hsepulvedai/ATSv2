export class Skill {
    constructor(skill:string, req:boolean, weight:number) {
        // this.id = id;
        this.Skill = skill;
        this.Required = req;
        this.Weight = weight;
    }
    // id:number;
    Skill:string;
    Required:boolean;
    Weight:number;

    toString():string {
        return this.Skill
    }
}