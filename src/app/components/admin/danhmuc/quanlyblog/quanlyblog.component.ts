import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/danhmuc/blog.service';

@Component({
  selector: 'app-quanlyblog',
  templateUrl: './quanlyblog.component.html',
  styleUrls: ['./quanlyblog.component.css']
})
export class QuanlyblogComponent implements OnInit {

  constructor(private blog:BlogService) { }

  ngOnInit(): void {
    this.getPage();
  }
  search = {
    sSearch: '',
    pageIndex: 0,
    pageSize: 10,
  };
  DsBaiViet:any;
  total = 0;
  getPage(){
    this.blog.GetPage(this.search).subscribe((res:any)=>{
      this.DsBaiViet = res.list;
      console.log(res);
      this.total = res.total;
    })
  }
  getPaginate(event) {
    this.search.pageIndex = event.pageIndex;
    this.search.pageSize = event.pageSize;
    this.getPage();
  }
}
