import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _httpClient: HttpClient) {}

  private api_url = "http://localhost:3000/";

  private headers: HttpHeaders = new HttpHeaders({
    // "Content-Type": "application/json",
    Accept: "application/json"
  });

  /**
   * Format error & throw it back
   */
  private formatError(error: any): Observable<String> {
    console.error(`An error has occured ${error.message}`);
    return throwError(error.message);
  }

  /**
   * Get method
   * @param path The endpoint URL
   * @param params The paraneters to be send in url
   * @return An `Observable` of any
   */
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    let headers = this.headers.append("Content-Type", "application/json");
    const URL = this.api_url + path;
    return this._httpClient
      .get(URL, { headers, params })
      .pipe(catchError(this.formatError));
  }

  /**
   * Post method
   * @param path The endpoint URL
   * @param body The content to replace with
   * @return An `Observable` of any
   */
  post(path: string, body: Object): Observable<any> {
    let headers = this.headers.append("Content-Type", "application/json");
    const URL = this.api_url + path;
    return this._httpClient
      .post(URL, JSON.stringify(body), { headers })
      .pipe(catchError(this.formatError));
  }

  /**
   * Put method
   * @param path The endpoint URL
   * @param body The content to replace with
   * @return An `Observable` of any
   */
  put(path: string, body: Object): Observable<any> {
    let headers = this.headers.append("Content-Type", "application/json");
    const URL = this.api_url + path;
    return this._httpClient
      .put(URL, JSON.stringify(body), { headers })
      .pipe(catchError(this.formatError));
  }


}
