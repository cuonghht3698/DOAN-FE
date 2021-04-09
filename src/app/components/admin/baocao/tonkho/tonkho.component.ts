import { Component, OnInit } from '@angular/core';
import { KhoService } from 'src/app/services/danhmuc/kho.service';

@Component({
  selector: 'app-tonkho',
  templateUrl: './tonkho.component.html',
  styleUrls: ['./tonkho.component.css'],
})
export class TonkhoComponent implements OnInit {
  constructor(private kho: KhoService) {}

  ngOnInit(): void {
    this.getAllDMKho();
    this.GetTonKho();
  }
  search = {
    Search: '',
    PageIndex: 0,
    PageSize: 10,
    IdKho: '',
  };
  total = 0;
  dsKho: any;
  dsSearchKho :any;
  GetTonKho() {
    this.kho.GetTonKho(this.search).subscribe((res: any) => {
      this.dsKho = res.list;
      this.total = res.total;
      console.log(res);
    });
  };
  OpenDiaLog(item) {}
  getAllDMKho() {
    this.kho.GetAllKho().subscribe((res) => {
      this.dsSearchKho = res;
    });
  }
  getPaginate(event) {
    this.search.PageIndex = event.pageIndex;
    this.search.PageSize = event.pageSize;
    this.GetTonKho();
  }
}
