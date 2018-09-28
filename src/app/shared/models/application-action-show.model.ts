export interface IApplicationActionShow {
    rowNumber:number,
    actionId?: number, 
    actionType?: string,
    actionDate?: Date,
    comments?: string,
    status?: string,
    recruiter?: string
}