import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/services/ERole';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  BackHome(){
    const checkRole = JSON.parse(localStorage.getItem("user"));
    if(checkRole){
      if(checkRole[0].roles != Role.KhachHang)
        {
            this.route.navigateByUrl('dashboard/baocao')
        }
      else{
        // this.route.navigateByUrl('dashboard/baocao') go to Khach hang
      }
    }
    else{
      this.route.navigateByUrl('login')
    }
  }
}
