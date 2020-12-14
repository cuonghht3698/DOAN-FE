import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form:FormGroup;
  constructor(private fb:FormBuilder,private ToastrService:ToastrService) { }

  ngOnInit(): void {

  }

  Dangky(data){


  }
  color=["red","yellow","green","pink","blue","black","plum","navy"]
}
