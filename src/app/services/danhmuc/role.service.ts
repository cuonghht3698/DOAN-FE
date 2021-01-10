import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class RoleService {
  constructor(private http: HttpClient) {}

  getPage(search:any) {
    return this.http.post(environment.ApiUrl + 'role/getPage',search);
  }

  Create(data) {
    return this.http.post(environment.ApiUrl + 'role', data);
  }

  Update(data) {
    return this.http.put(environment.ApiUrl + 'role', data);
  }

  Delete(id) {
    return this.http.delete(environment.ApiUrl + 'role/' + id);
  }

}
