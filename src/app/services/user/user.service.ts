import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { environment } from "src/environments/environment";

@Injectable({
  providedIn:'root'
})

export class UserService {
  baseUrl = environment.ApiUrl;
  constructor(private http:HttpClient){}

  getProfileById(id){
    return this.http.get(this.baseUrl + 'user/' + id);
  }
}
