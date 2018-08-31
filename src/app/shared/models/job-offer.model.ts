export interface IJobOffer {
    jobId: number,
    jobName: string,
    company?:string,
    city?:string,
    country?: string,
    jobCategory?:string,
    jobType?:string,
    description?:string
    jobStatus?:string
}