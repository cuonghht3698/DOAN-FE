
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public constructor(private Router: Router) {
  }
  data:any;
  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem("user"));
  }
  Logout() {
    localStorage.removeItem("token");
    this.Router.navigateByUrl("login");
  }
}
