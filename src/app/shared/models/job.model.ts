export interface IJob {
    id?: number,
    name?: string,
    companyId?: number,
    jobCategoryId?: number, 
    jobTypeId?: number,
    jobStatusId?: number,
    createdBy?: string,
    createdDate?: Date,
    modifiedBy?: string,
    modifiedDate?: Date,
    active?:boolean,
    description?: string
}


