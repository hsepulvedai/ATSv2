export interface IApplicant {
    id?: number,
    userId?: number,
    firstName?:string,
    lastName?:string,
    email?:string,
    phone?: string,
    addressId?: number,
    addressLine?:string,
    addressLine2?:string,
    city?:string,
    stateProvince?:string,
    country?:string,
    zipCode?:string,
    // resume?: File,
    createdBy?: string,
    createdDate?: Date,
    modifiedBy?: string,
    modifiedDate?: string,
    active?:boolean
    fullName?: string, 
    location?: string
    applicationComments?:string
}
