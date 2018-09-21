export interface IApplication {
    id?: number,
	jobId?: number, 
	applicantId?: number, 
	applicationStatusId?:number,
	resumeId?:number,
	email?: string, 
	phone?: string
	employeeId?: number,
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
	comments?:string
}