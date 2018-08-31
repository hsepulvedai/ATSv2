export interface IApplication {
    id?: number,
	jobId?: number, 
	applicantId?: number, 
	userId?: number, 
	applicationStatusId?: number, 
	resume?: File,
	comments?: string,
    createdBy?: string,
    createdDate?: Date,
    modifiedBy?: string,
    modifiedDate?: Date,
    active?: boolean,
	email?: string, 
	phone?: string, 
	addressId?: number
}