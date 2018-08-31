export interface IApplicant {
    id?: number
    phone?: string,
    addressId?: number,
    userId?: number,
    resume?: File,
    createdBy?: string,
    createdDate?: Date,
    modifiedBy?: string,
    modifiedDate?: string,
    active?:boolean
}
