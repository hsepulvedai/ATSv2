import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {


  public paginatorSize:number
  public pageSize: number = 10;
  public pageNumber: number = 1;
  public paginationCollectionSize:number

  constructor() { }

  setPageRange(totalRows): void {
    this.paginatorSize = Math.ceil(totalRows / this.pageSize)
  }

  getCollectionSize(): number {
    this.paginationCollectionSize = this.paginatorSize * 10
    return this.paginationCollectionSize
  }

  setPageSize(newSize) {
    this.pageSize = newSize
  }

  getPageNumber() {
    return this.pageNumber
  }



}