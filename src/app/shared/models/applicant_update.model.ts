export interface IApplicantUpdate {
    id?:number,
    firstName?: string,
    lastName?: string, 
    email?: string,
    password?: string,
    addressLine?: string,
    addressLine2?: string,
    city?: string,
    stateProvince?: string,
    country?: string, 
    zipCode?: string,
    phone?: string
}
