import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { Role } from 'src/app/services/ERole';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authent: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {
    if (localStorage.getItem('user')) {
      this.router.navigateByUrl('shop');
    }
  }
  data = {
    Username: '',
    Password: '',
  };
  ngOnInit(): void {}
  DangNhap() {
    if (this.data.Username == '' || this.data.Password == '') {
      return;
    }
    this.authent.login(this.data).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.authent.getUser().subscribe((res: any) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigateByUrl('shop');
          location.reload();
        });
      },
      (err) => {
        this.toastr.error('Lỗi', 'Đăng nhập không thành công !');
      }
    );
  }
}
