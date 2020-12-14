import { AuthenticationService } from 'src/app/services/userService/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css','../../css/style.css']
})
export class UserComponent implements OnInit {

  userLogin;

  constructor(private user:AuthenticationService) { }

  ngOnInit() {
    this.userLogin = JSON.parse(localStorage.getItem("user"));
    console.log(this.userLogin);
    
    this.getProfile();
  }
  getProfile(){
    this.user.getProfileById(this.userLogin.id).subscribe(
      (res)=>{
        console.log(res);
        
      }
    )
  }
}
