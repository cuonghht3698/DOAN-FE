import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/services/ERole';
declare const $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router:Router,private _location: Location) { }
  isCollapsed = false;
  ngOnInit(): void {
      var fullHeight = function() {
        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function(){
          $('.js-fullheight').css('height', $(window).height());
        });

      };
      fullHeight();

      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });


    //
    const user =JSON.parse(localStorage.getItem("user"));
    if(user){
      if(user[0].role == Role.KhachHang){
        this._location.back();
      }
    }
  }

  menuItems: any[];
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  Click(){
}
}
