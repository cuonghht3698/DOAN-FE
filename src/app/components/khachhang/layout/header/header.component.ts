import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { CartService } from 'src/app/services/danhmuc/cart.service';
import { GuidId } from 'src/app/services/ERole';
import { DataService } from 'src/app/services/share/data.share';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  drop1 = false;
  constructor(
    private user: AuthenticationService,
    private router: Router,
    private c: CartService,
    public up: DataService,
    private authent: AuthenticationService,
    private cookieService: CookieService
  ) {}
  name = '';
  Id = '';
  totalCart = 0;
  DaDangNhap = false;
  checkUserEmpty = GuidId.EmptyId;
  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.name = JSON.parse(localStorage.getItem('user'))[0].hoTen;
      this.Id = JSON.parse(localStorage.getItem('user'))[0].id;
      var user = JSON.parse(localStorage.getItem('user'))[0];
      this.DaDangNhap = true;
      if (user.checkChuaDangNhap) {
        this.DaDangNhap = false;
      }
      this.GetCount();
    }
    this.getTongTien();
  }
  totalCheck = this.up.selectedValue;
  ngDoCheck(): void {
    if (this.totalCheck != this.up.selectedValue) {
      this.totalCheck = this.up.selectedValue;
      this.getTongTien();
    }
  }
  logout() {
    localStorage.clear();
    this.DangNhap();
    this.router.navigateByUrl('../shop');
    window.location.reload();
  }
  TongTien = 0;
  getTongTien() {
    var ClientId = this.cookieService.get('ClientId');
    this.c.ShowShoppingCart(this.Id, ClientId).subscribe((res: any) => {
      this.TongTien = 0;
      if (res.length > 0)
        res.forEach((item) => {
          this.TongTien += item.soLuong * item.gia;
        });
    });
  }
  goto(go) {
    this.router.navigateByUrl('/shop/' + go);
  }
  GetCount() {
    var t = this.user.getUserLocal();
    if (t) {
      var ClientId = this.cookieService.get('ClientId');
      this.c.ShowShoppingCart(t.id, ClientId).subscribe((res: any) => {
        this.up.Value(Number(res.length));
      });
    }
  }

  data = {
    Username: 'khachhang',
    Password: 'khachhang',
  };
  DangNhap() {
    if (this.data.Username == '' || this.data.Password == '') {
      return;
    }
    this.authent.login(this.data).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.authent.getUser().subscribe((res: any) => {
          localStorage.setItem('user', JSON.stringify(res));
        });
      },
      (err) => {}
    );
  }
}
