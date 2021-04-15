import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HoaDonNhapKhoService {
  baseUri = environment.ApiUrl + 'nhapkhos/';
  constructor(private http: HttpClient) {}
  getPage(data) {
    return this.http.post(this.baseUri + 'getpage', data );
  }
  getByIdNhapKho(Id) {
    return this.http.get(this.baseUri + 'chitiet', { params: Id });
  }
  Create(data) {
    return this.http.post(this.baseUri, data);
  }
  Update(data) {
    return this.http.put(this.baseUri, data);
  }
  Delete(Id) {
    return this.http.delete(this.baseUri, { params: Id });

  }
}
