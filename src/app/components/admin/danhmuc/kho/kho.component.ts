import { Component, OnInit } from '@angular/core';
import { KhoService } from 'src/app/services/danhmuc/kho.service';

@Component({
  selector: 'app-kho',
  templateUrl: './kho.component.html',
  styleUrls: ['./kho.component.css']
})
export class KhoComponent implements OnInit {

  constructor(private kho:KhoService) { }

  ngOnInit(): void {
    this.getPage();
  }
  search = {
    Search:'',
    PageIndex: 1,
    PageSize: 10,
  }
  total = 0;
  dsKho:any;
  getPage(){
    this.kho.GetPage(this.search).subscribe((res:any)=>{
      this.dsKho = res.list;
      this.total = res.total;
    })
  };
  OpenDiaLog(item){}

  getPaginate(event) {
    this.search.PageIndex = event.pageIndex;
    this.search.PageSize = event.pageSize;
    this.getPage();
   }
}
