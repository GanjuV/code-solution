import { Observable } from 'rxjs';
import { DATA_URL } from './../app.constant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  /**
   * Creates an instance of DataService.
   * @param {HttpClient} http 
   * 
   * @memberOf DataService
   */
  constructor(private http: HttpClient) {}

  /**
   * Get call to fetch data from the provided URL
   * 
   * @returns {Observable<any>} 
   * 
   * @memberOf DataService
   */
  getHouseDetails(): Observable<any> {
    return this.http.get(`${DATA_URL}`);
  }
}

