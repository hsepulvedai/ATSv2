import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {


  public paginatorSize:number
  public pageSize: number = 5;
  public pageNumber: number = 1;

  constructor() { }

  // // Gets the page number from the page url string    
  // getPageFromString(urlString: string): number {
  //   if (urlString != null) return + urlString.substr(urlString.indexOf("page=") + 5, urlString.length);
  //   else return -1;
  // }

  setPageRange(totalRows): void {
    this.paginatorSize = Math.ceil(totalRows / this.pageSize)
  }

}