import { Component, OnInit } from '@angular/core';
import { Avatar } from 'src/app/services/constrans';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor() { }
  url = environment.ApiUrl + "anh/get/";
  dsAnh = Avatar;
  ngOnInit(): void {
  }

}
