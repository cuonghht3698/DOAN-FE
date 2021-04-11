import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/services/constrans';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }
  url = environment.ApiUrl + "anh/get/";
  dsAnh = Banner;
  ngOnInit(): void {
  }

}
