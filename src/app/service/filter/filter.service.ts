import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from "../api-service/api.service";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private _url_all = 'http://localhost:3000/';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  public getAllData(): Observable<any> {
    return this.http.get(this._url_all);
  }

  getThemes() {
    return this.apiService.get("");
  }

}
