import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GuidId } from 'src/app/services/ERole';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form:FormGroup;
  constructor(private fb:FormBuilder,private ToastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem("user"))) {
      if (JSON.parse(localStorage.getItem("user"))[0].role =='khachhang') {
        this.router.navigateByUrl("shop")
      }
      else
      {
        // addmin
      }
    }
    else
    {
      this.router.navigateByUrl("shop")

    }
  
  }

  Dangky(data){


  }
  color=["red","yellow","green","pink","blue","black","plum","navy"]
}


export class UserModel{
  Id: GuidId.EmptyId;
  HoTen: string;
  DiaChi: string;
  NgaySinh: Date;

}