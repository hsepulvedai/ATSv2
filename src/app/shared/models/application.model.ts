export interface IApplication {
    id?: number,
	jobId?: number, 
	jobName?: string, 
	jobDescription?:string,
	jobCategory?: string,
	jobType?:string,
	companyName?: string, 
	companyCity?: string, 
	companyCountry?: string,
	applicantId?: number, 
	applicantFirstName?: string, 
	applicantLastName?: String, 
	applicationStatusId?:number,
	applicationStatus?: string, 
	resumeId?:number,
	resumeUrl?:string,
	applicantEmail?: string,
	applicantPhone?: string
	employeeId?: number,
	employeeFirstName?:string,
	employeeLastName?:string,
    createdBy?: string,
    createdDate?: Date,
    modifiedBy?: string,
    modifiedDate?: Date,
	active?: boolean
	addressLine?:string,
	addressLine2?:string,
	city?:string,
	stateProvince?:string,
	country?:string,
	zipCode?:string,
	comments?:string,
	dateApplied?: Date,
	consideration?:string
}