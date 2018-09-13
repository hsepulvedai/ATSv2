import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { IJob } from '../../shared/models/job.model'

import { environment } from '../../../environments/environment';
import { IJobUpdate } from '../models/job_update.model';
import { IJobOfferHR } from '../models/job-offer-hr.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  currentJob: IJobOfferHR
  currentJobId: number

  routePrefix = "Job/"

  constructor(private http: HttpClient) { }

  setCurrentJobId(id) {
    this.currentJobId = id;
  }

  showAvalaibleJobsHR() {
    return this.http.get(environment.baseUrl + this.routePrefix + "JobCompleteShowAll")
  }

  showAvalaibleJobs(pageNumber, pageSize) {
    return this.http.get(environment.baseUrl + this.routePrefix + "JobShowAllActivePagination/pageNumber="
      + pageNumber + '/pageSize=' + pageSize)
  }

  countActiveJobs() {
    return this.http.get(environment.baseUrl + this.routePrefix + "JobAllActiveCount")
  }


  showPastJobs() {
    return this.http.get(environment.baseUrl + this.routePrefix + "JobShowAllInactive")
  }

  showJobOfferDetail(id) {
    return this.http.get(environment.baseUrl + this.routePrefix + "JobShowById/" + id)
  }

  showJobById(id) {
    return this.http.get(environment.baseUrl + this.routePrefix + "JobShowById/" + id)
  }

  // showDraftJobs(pageNumber, pageSize) {
  //   return this.http.get(environment.baseUrl + this.routePrefix + "JobDraftsShowAll/pageNumber="
  //     + pageNumber + "/pageSize=" + pageSize)
  // }


  // Change to application
  getStatusByEmail(email) {
    return this.http.get(environment.baseUrl + this.routePrefix + "getStatusByEmail/" + email)
  }

  setActiveJob(id: number) {
    return this.http.patch(environment.baseUrl + this.routePrefix + "JobSetActive/" + id, id)

  }

  setInactiveJob(id: number) {
    return this.http.patch(environment.baseUrl + this.routePrefix + "JobSetInactive/" + id, id)

  }

  addJobMaintenance(job) {
    return this.http.post(environment.baseUrl + this.routePrefix + 'JobInsertFromWeb', job)
  }

  addDraft(job){
    return this.http.post(environment.baseUrl + this.routePrefix + 'JobDraftInsert', job)
  }

  deleteDraft(id) {
    return this.http.delete(environment.baseUrl + this.routePrefix + 'JobDraftDelete/' + id)
  }

  updateJob(job: IJobUpdate) {
    return this.http.put(environment.baseUrl + this.routePrefix + 'JobEditAll', job)
  }

  // Sorting
  sortByJobTitleAsc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveTitleAZ')
  }

  sortByJobTitleDesc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveTitleAZ')
  }

  // Sorting and sorting

  sortByCompanyAsc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveCompanyAZ')
  }

  sortByCompanyDesc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveCompanyZA')
  }

  sortByJobLocationCityAsc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveLocationCityAZ')
  }

  sortByJobLocationCityDesc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveLocationCityZA')
  }

  sortByJobLocationCountryAsc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveLocationCountryAZ')
  }

  sortByJobLocationCountryDesc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveLocationCountryZA')
  }

  sortByJobCateogoryAsc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveCategoryAZ')
  }

  sortByJobCateogoryDesc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveCategoryZA')
  }

  sortByJobTypeAsc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveTypeAZ')
  }

  sortByJobTypeDesc() {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobShowAllActiveTypeZA')
  }

  universalSearch(keyword, pageNumber, pageSize) {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobUniversalSearch/search='
      + keyword + "/pageNumber=" + pageNumber + "/pageSize=" + pageSize)
  }

  universalSearchSortAsc(keyword, sortBy) {
    return this.http.get(environment.baseUrl + this.routePrefix
      + 'JobUniversalSearchSortAZ/search=' + keyword + 'sortBy=' + sortBy)
  }

  universalSearchSortDesc(keyword, sortBy) {
    return this.http.get(environment.baseUrl + this.routePrefix
      + 'JobUniversalSearchSortZA/search=' + keyword + 'sortBy=' + sortBy)
  }

  universalSearchCount(keyword, pageNumber, pageSize) {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobUniversalSearchCount/search='
      + keyword + "/pageNumber=" + pageNumber + "/pageSize=" + pageSize)
  }

  universalSearchInactive(keyword, pageNumber, pageSize) {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobUniversalSearchInactive/search='
      + keyword + "/pageNumber=" + pageNumber + "/pageSize=" + pageSize)
  }

  universalSearchCountInactive(keyword, pageNumber, pageSize) {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobUniversalSearchCountInactive/search='
      + keyword + "/pageNumber=" + pageNumber + "/pageSize=" + pageSize)
  }

  universalSearchDrafts(keyword, pageNumber, pageSize) {
    return this.http.get(environment.baseUrl + this.routePrefix + 'JobUniversalSearchAllDrafts/search='
      + keyword + "/pageNumber=" + pageNumber + "/pageSize=" + pageSize)
  }

  universalSearchCountDrafts() {
    return this.http.get(environment.baseUrl + this.routePrefix + "JobDraftCount/")
    
  }




}


