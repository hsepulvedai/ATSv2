export interface IApplicationAction {
    id?: number,
	actionDate?: Date,
	applicationIdv: number,
	actionTypeId?: number,
	actionStatusId: number, 
	commments?: string,
    createdBy?: string,
    createdDate?: Date,
    modifiedBy?: string,
    modifiedDate?: Date,
    active?: boolean,
	userId?: number
	
}