import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tonkho',
  templateUrl: './tonkho.component.html',
  styleUrls: ['./tonkho.component.css']
})
export class TonkhoComponent implements OnInit {

  constructor() { }
  dataSource:any;
  total = 0;
  Search = {
    sSearch: '',
    PageIndex: 0,
    PageSize: 10,
  };
  ngOnInit(): void {
  }
  getPaginate(event) {
    this.Search.PageIndex = event.pageIndex;
    this.Search.PageSize = event.pageSize;
  }
}
