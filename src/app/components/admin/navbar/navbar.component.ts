import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private user:AuthenticationService) { }
  dropdown = false;
  ngOnInit(): void {
  }
  Dropdown(){
    this.dropdown = !this.dropdown;
  }
  Logout(){
    this.user.logout();
  }
}
