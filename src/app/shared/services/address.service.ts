import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  routePrefix = 'Address'

  constructor(private http:HttpClient) { }

  getAddressById(id) {
    return this.http.get(environment.baseUrl + this.routePrefix + '/AddressSelectById/' + id)
  }

}
