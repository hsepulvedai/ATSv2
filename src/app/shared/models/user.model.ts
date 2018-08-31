export interface IUser {
    id?: number
    firstName?: string,
	lastName?: string, 
	email?: string, 
	password?: string, 
	roleId?: number,
    createdBy?: string,
    createdDate?: Date,
    modifiedBy?: string,
    modifiedDate?: Date,
    active?:boolean  
}