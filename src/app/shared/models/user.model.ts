export interface IUser {
    id?: number
    firstName?: string,
	lastName?: string, 
	email?: string, 
    password?: string,
    phone?:string, 
    roleId?: number,
    role?: string,
    createdBy?: string,
    createdDate?: Date,
    modifiedBy?: string,
    modifiedDate?: Date,
    active?:boolean
}