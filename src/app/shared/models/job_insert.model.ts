export interface IJobInsert {
    jobName?:string,
    companyId?:number,
    jobCategory?:string,
    jobType?: string,
    jobDescription?: string
    jobStatus?:string
    jobSkills?:string[]
}