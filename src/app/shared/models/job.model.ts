export interface IJob {
    jobId?: number,
    jobName?: string,
    companyId?: number,
    company?:string,
    jobCategoryId?: number, 
    jobCategory:string,
    jobTypeId?: number,
    jobType?:string,
    jobStatusId?: number,
    jobStatus?:string,
    createdBy?: string,
    createdDate?: Date,
    modifiedBy?: string,
    modifiedDate?: Date,
    active?:boolean,
    jobDescription?: string,
    numberOfApplicants?:number
    jobSkills?:string
    city?:string,
    country?:string,

}


