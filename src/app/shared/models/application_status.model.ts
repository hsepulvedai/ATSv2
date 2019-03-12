export interface IApplicationStatus {
    id?: number
    status?: string,
    createdBy?: string,
    createdDate?: Date,
    modifiedBy?: string,
    modifiedDate?: Date,
    active?:boolean,
}