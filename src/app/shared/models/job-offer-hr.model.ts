export interface IJobOfferHR {
    jobId: number,
    jobName: string,
    jobStatus?:string
    jobCategory?:string,
    jobType?:string,
    numberofApplicants?:number,
    active?:boolean
}