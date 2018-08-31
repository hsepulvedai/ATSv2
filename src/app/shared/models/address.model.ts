export interface IAddress {
    id?: number
    addressLine?: string, 
    addressLine2?: string,
    city?: string,
    stateProvince?: string,
    country?: string,
    zipCode?: string,
    createdBy?: string,
    createdDate?: Date,
    modifiedBy?: string,
    modifiedDate?: Date,
    active?: boolean
}