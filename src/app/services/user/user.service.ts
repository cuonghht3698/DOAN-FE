import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl = environment.ApiUrl + 'user/';
  constructor(private http: HttpClient) { }

  getProfileById(id) {
    return this.http.get(this.baseUrl + id);
  }

  changePassword(data) {
    return this.http.post(this.baseUrl + 'changepass', data);
  }

  changeProfile(data) {
    return this.http.post(this.baseUrl + 'changeprofile', data);
  }

  getPage(data) {
    return this.http.post(this.baseUrl + 'getPage', data);
  }

  updateUser(data){
    return this.http.put(this.baseUrl + 'updateUser', data)
  }


  delete(id){
    return this.http.delete(this.baseUrl + id);
  }
}
