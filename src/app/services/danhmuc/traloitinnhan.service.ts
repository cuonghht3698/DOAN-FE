import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TraLoiTinNhanService {
  baseUri = environment.ApiUrl + 'tralois/';
  constructor(private http: HttpClient) {}
  Sent(data) {
    return this.http.post(this.baseUri, data);
  }
  GetById(Id) {
    return this.http.get(this.baseUri + Id);
  }
}
