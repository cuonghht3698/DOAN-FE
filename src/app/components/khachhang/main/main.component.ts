import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  showChat = true;
  constructor(private authent: AuthenticationService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.DangNhap();
    }
  }
  HideChat() {
    this.showChat = true;
  }
  ShowChat() {
    this.showChat = false;
  }
  data = {
    Username: 'noname',
    Password: 'noname',
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
      (err) => {
       
      }
    );
  }
}
