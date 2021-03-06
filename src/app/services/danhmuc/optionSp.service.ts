import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class optionservice {
  constructor(private http: HttpClient) {}
  baseUri = environment.ApiUrl + 'options/';
  Create(data) {
    return this.http.post(this.baseUri, data);
  }
  GetOptionByHang(ma) {
    return this.http.get(this.baseUri + 'GetOptionByHang/' + ma);
  }
  GetOptionByIdSp(Id) {
    return this.http.get(this.baseUri + 'GetOptionByIdSp/' + Id);
  }
  GetPage(search) {
    return this.http.post(this.baseUri + 'GetPage', search);
  }
  Update(data) {
    return this.http.put(this.baseUri, data);
  }

  Delete(id) {
    return this.http.delete(this.baseUri + id);
  }

  FindByLoai(id) {
    return this.http.get(this.baseUri + 'FindByLoai?id=' + id);
  }
}
