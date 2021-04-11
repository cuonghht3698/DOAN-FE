import { AuthenticationService } from '../../services/authService/authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurdService } from 'src/app/services/crud/curd.service';
import { GuidId, Role } from 'src/app/services/ERole';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  dataForm: FormGroup;
  returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private authent: AuthenticationService,
    private crud: CurdService
  ) {
    this.dataForm = this.fb.group({
      Username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      Password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      //remember: false
    });
  }
  data;
  demo;
  ngOnInit(): void {
    const checkLogin = JSON.parse(localStorage.getItem('user'));
    if (checkLogin && !checkLogin[0].checkChuaDangNhap) {
      if (checkLogin[0].role == Role.KhachHang) {
        this.router.navigateByUrl('shop');
      } else {
        this.router.navigateByUrl('quanly');
      }
    } else {
      //this.router.navigateByUrl('login');
    }
  }
  DangNhap(data) {
    this.authent.login(data).subscribe(
      (res: any) => {

        localStorage.setItem('token', res.token);
        this.authent.getUser().subscribe((res: any) => {
          localStorage.setItem('user', JSON.stringify(res));
          if (
            res[0].role == Role.Admin ||
            res[0].role == Role.GiamDoc ||
            res[0].role == Role.NhanVien
          ) {
            this.router.navigateByUrl('quanly');
          } else {
            this.router.navigateByUrl('shop');
          }
        });
      },
      (err) => {
        this.toastr.error('Lỗi', 'Đăng nhập không thành công !');
      }
    );
  }
  color = ['red', 'yellow', 'green', 'pink', 'blue', 'black', 'plum', 'navy'];
}
