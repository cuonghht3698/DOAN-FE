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
  GetById(Id, size) {
    return this.http.get(this.baseUri, { params: { Id: Id, Size: size } });
  }
  Watched(Id) {
    return this.http.get(this.baseUri + 'Watched/' + Id);
  }
  Delete(id) {
    return this.http.delete(this.baseUri + id);
  }
  ThuHoi(id) {
    return this.http.get(this.baseUri + 'thuhoi/' + id);
  }
}
