
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,private router:Router) { }


  login(data){
    return this.http.post(environment.ApiUrl+'authentication/Login',data);
  }

  register(data){

  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("login");
  }

  getUser(){
    return this.http.get(environment.ApiUrl+' userprofile');
  }

  getProfileById(id){
    return this.http.get(environment.ApiUrl + 'userprofile/'+ id);
  }

  /**
   * Tài khoản đã được xác thực hay chưa
   */
  isAuthenticated(): boolean {
    const vUser = JSON.parse(localStorage.getItem("user"));
    if (vUser == null || vUser.token == null) {
      return false;
    }
  }

  isAuthorized(role){
    const RoleUser = JSON.parse(localStorage.getItem("user"))
    for (let index = 0; index < role.length; index++) {
      if(RoleUser.roles == role[index]){
        console.log(role[index]);

        return true
      }

    return false;
  }
}
}
