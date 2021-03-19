import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { GuidId, Role } from 'src/app/services/ERole';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private Toast: ToastrService,
    private router: Router,
    private dk: AuthenticationService
  ) {}
  dataUser: UserModel = {
    Id: GuidId.EmptyId,
    HoTen: '',
    Username: '',
    Active: true,
    DiaChi: '',
    Email: '',
    GioiThieu: '',
    Password: '',
    Role: Role.KhachHang,
    SoDienThoai: '',
    Tuoi: 0,
  };
  PasswordCheck = '';
  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      if (JSON.parse(localStorage.getItem('user'))[0].role == 'khachhang') {
        this.router.navigateByUrl('shop');
      } else {
        // addmin
      }
    }
  }

  Dangky() {
    if (
      this.dataUser.HoTen == '' ||
      this.dataUser.Username == '' ||
      this.dataUser.Password == '' ||
      this.dataUser.Email == ''
    ) {
      this.Toast.error('Thông tin không chính xác', 'Thông báo!');
      return;
    }

    this.dk.register(this.dataUser).subscribe((res) => {
      this.Toast.success('Tạo tài khoản thành công', 'Thông báo!');
      //this.r.navigate(['../login'], { queryParams: { id: item.id } });
    });
  }
  color = ['red', 'yellow', 'green', 'pink', 'blue', 'black', 'plum', 'navy'];
}

export class UserModel {
  Id: GuidId.EmptyId;
  HoTen: string;
  DiaChi: string;
  Tuoi: number;
  SoDienThoai: string;
  GioiThieu: string;
  Email: string;
  Username: string;
  Password: string;
  Role: string;
  Active: boolean;
}
