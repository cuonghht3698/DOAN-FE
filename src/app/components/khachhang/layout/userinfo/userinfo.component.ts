import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/layouts/registration/registration.component';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { GuidId } from 'src/app/services/ERole';
import { UserService } from 'src/app/services/user/user.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
})
export class UserinfoComponent implements OnInit {
  constructor(
    private user: UserService,
    private auth: AuthenticationService,
    private toart: ToastrService
  ) {}
  UserId: any;
  pass1 = '';
  pass2 = '';

  DataUser = {
    HoTen: '',
    Email: '',
    GioiThieu: '',
    NgaySinh: null,
    DiaChi: '',
    SoDienThoai: '',
    Username: '',
    Id: '',
    Password: '',
    Role : this.auth.getUserLocal().role
  };
  ngOnInit(): void {
    this.UserId = this.auth.getUserLocal().id;
    this.getInfo();
  }
  getInfo() {
    if (this.UserId) {
      this.user.getProfileById(this.UserId).subscribe((res: any) => {
        this.DataUser = {
          HoTen: res.hoTen,
          Email: res.email,
          GioiThieu: res.gioiThieu,
          NgaySinh: res.ngaySinh,
          DiaChi: res.diaChi,
          SoDienThoai: res.soDienThoai,
          Username: res.username,
          Id: this.UserId,
          Password: '',
          Role:this.auth.getUserLocal().role
        };
      });
    }
  }

  CapNhat() {
    if (this.pass1 != '' && this.pass2 != '') {
      if (this.pass1 == this.pass2) {
        this.DataUser.Password = this.pass1;
      } else {
        this.toart.error("Mật khẩu không trùng khớp","Cảnh báo!");
        return;
      }
    }
    this.user.updateUser(this.DataUser).subscribe((res) => {
      this.toart.success("Cập nhật thành công","Cảnh báo!");
      location.reload();
    });
  }
}
