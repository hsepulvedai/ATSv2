import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {


  public paginatorSize:number
  public pageSize: number = 5;
  public pageNumber: number = 1;

  constructor() { }

  // Goes to an expecific page    
  gotoPage(page: number) {
    // this.pageNumber = page;
    // this.pagination.previousPage = (page - 1).toString();
    // this.pagination.currentPage = page;
    // this.pagination.nextPage = (page + 1).toString();
    // Llamar al metodo de la lista
  }
  // Goes to last page of the list    
  gotoLastPage() {
    // this.pageNumber = this.pages.length;
    // this.pagination.previousPage = (this.pageNumber - 1).toString();
    //this.getAssignedTests();
  }
  // Goes to the previous page    
  gotoPreviousPage() {
    this.pageNumber--;
    // this.pagination.previousPage = (this.pagination.currentPage - 2).toString();
    // this.pageNumber = this.pagination.currentPage - 1;
    // this.pagination.nextPage = this.pagination.currentPage.toString();
    //this.getAssignedTests();
  }
  //Goes to the next page    
  gotoNextPage() {
    this.pageNumber++;
    //this.pagination.currentPage + 1, this.pagination.nextPage;
    //this.getAssignedTests();
  }
  // Gets the page number from the page url string    
  getPageFromString(urlString: string): number {
    if (urlString != null) return +urlString.substr(urlString.indexOf("page=") + 5, urlString.length);
    else return -1;
  }

  setPageRange(totalRows): void {
    this.paginatorSize = Math.ceil(totalRows / this.pageSize)
    console.log("Pagination size on pagination service = " + this.paginatorSize)

    //console.log('totalRows', totalRows)
    //this.pages = [];

    // for (let i = 0; i <〈 Math.ceil(totalRows / this.pageSize); i++) {
    //   this.pages.push(i + 1);
    // }

  }

}