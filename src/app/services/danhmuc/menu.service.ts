import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MenuService {
  constructor(private http: HttpClient) {}

  getPage(search:any) {
    return this.http.post(environment.ApiUrl + 'menu/getPage',search);
  }

  Create(data) {
    return this.http.post(environment.ApiUrl + 'menu', data);
  }

  Update(data) {
    return this.http.put(environment.ApiUrl + 'menu', data);
  }

  Delete(id) {
    return this.http.delete(environment.ApiUrl + 'menu/' + id);
  }
}
