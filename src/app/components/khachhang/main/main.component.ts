import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  showChat = true;
  constructor(
    private authent: AuthenticationService,
    private cookieService: CookieService,
    private router:Router
  ) {}
  generate_string() {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 12; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.DangNhap();
      // check da có cokie chưa
      if (this.cookieService.check('ClientId')) {
        var ClientId = this.cookieService.get('ClientId');
        localStorage.setItem('ClientId', ClientId);
      }
      else
      {
        var l = this.generate_string();
        this.cookieService.set('ClientId', l);
        localStorage.setItem('ClientId', l);
      }
      //this.cookieValue = this.cookieService.get('Test');
    } else {

    }
  }
  HideChat() {
    this.showChat = true;
  }
  ShowChat() {
    this.showChat = false;
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
