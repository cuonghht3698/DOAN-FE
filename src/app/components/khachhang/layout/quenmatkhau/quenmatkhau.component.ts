import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-quenmatkhau',
  templateUrl: './quenmatkhau.component.html',
  styleUrls: ['./quenmatkhau.component.css'],
})
export class QuenmatkhauComponent implements OnInit {
  constructor(private user: UserService, private toarst: ToastrService) {}
  email = '';
  ngOnInit(): void {}
  XacNhan() {
    if (this.email == '') {
      this.toarst.error("Nhập email của bạn" , "Thông báo");
      return;
    }
    if (!this.validateEmail(this.email)) {
      this.toarst.error("Email không đúng định dạng" , "Thông báo");
      return;
    }
    this.user.quenmatkhau(this.email).subscribe((res:any) => {
      this.toarst.success("Hệ thống đã gửi mật khẩu mới vào email của bạn. Tài khoản " + res.username , "Thông báo");
    },err=>{
      this.toarst.error("Kiểm tra lại email" , "Thông báo");
    });
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
}
