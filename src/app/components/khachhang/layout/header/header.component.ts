import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  drop1 = false;
  constructor(private user: AuthenticationService, private router: Router) {}
  name = '';
  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.name = JSON.parse(localStorage.getItem('user'))[0].hoTen;
    }
  }
  logout() {
    localStorage.clear();
    location.reload();
  }

  goto(go){
    this.router.navigateByUrl("/shop/"+go);
  }
}
