export interface ICompany {
    id?: number
    name?: string,
    description?: string,
    addressId?: number,
    createdBy?: string,
    createdDate?: Date,
    modifiedBy?: string,
    modifiedDate?: Date,
    active?:boolean
}