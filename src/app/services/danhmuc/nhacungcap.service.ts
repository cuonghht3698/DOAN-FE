
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NhaCungCapService {
  baseUri = environment.ApiUrl + 'nhacungcaps/';
  constructor(private http: HttpClient) { }
  GetPage(search) {
    return this.http.post(this.baseUri + 'getPage', search);
  }


  Create(data) {
    return this.http.post(this.baseUri, data);
  }

  Update(data) {
    return this.http.put(this.baseUri, data);
  }

  Delete(id) {
    return this.http.delete(this.baseUri + id)
  }
}
