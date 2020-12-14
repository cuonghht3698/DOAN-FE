
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css','../../css/style.css']
})
export class UserComponent implements OnInit {


  constructor(private user:UserService,private fb:FormBuilder) { }
  ProfileUser:FormGroup;
  MyProfile:any;
   ngOnInit() {
    const userLogin = JSON.parse(localStorage.getItem("user"));
    this.getProfile(userLogin[0].id);
  }
   getProfile(id){
     this.user.getProfileById(id).subscribe(
      (res:any) => {
        this.MyProfile =  res;
        this.ProfileUser = this.fb.group({
          Id: this.MyProfile.id,
          HoTen: this.MyProfile.hoTen,
          DiaChi: this.MyProfile.diaChi,
          Email: this.MyProfile.email,
          GioiThieu: this.MyProfile.gioiThieu,
          Sdt: this.MyProfile.sdt,
          TenKhongDau: this.MyProfile.tenKhongDau,
          Username: this.MyProfile.username,
          Tuoi:this.MyProfile.tuoi
        });
      }
    )
  }
}
