import { Component, OnInit } from '@angular/core';
import { HoaDonNhapKhoService } from 'src/app/services/danhmuc/sohoadon.service';
import { TudienService } from 'src/app/services/danhmuc/tudien.service';
import * as moment from 'moment';
@Component({
  selector: 'app-quanlynhapkho',
  templateUrl: './quanlynhapkho.component.html',
  styleUrls: ['./quanlynhapkho.component.css'],
})
export class QuanlynhapkhoComponent implements OnInit {
  constructor(private tudien: TudienService, private hoadon:HoaDonNhapKhoService) {}

  ngOnInit(): void {
    this.getLoaiHoaDon();
    this.getPage();
  }
  dsLoaiHoaDon: any;
  dsHoaDon: any;
  total = 0;
  search = {
    Search: '',
    PageIndex: 0,
    PageSize: 10,
    TuNgay: moment().add(-7, 'day').format(),
    DenNgay: moment().format(),
    IdNguoiTao: null,
    IdTrangThai: null,
  };
  getLoaiHoaDon() {
    this.tudien.getByLoai('LoaiHoaDon').subscribe((res) => {
      this.dsLoaiHoaDon = res;
    });
  }
  getPage() {
    this.hoadon.getPage(this.search).subscribe((res:any) => {
      this.dsHoaDon = res.list;
      this.total = res.total;
      console.log(res);
    });
  }

  getPaginate(event) {
    this.search.PageIndex = event.pageIndex;
    this.search.PageSize = event.pageSize;
    this.getPage();
  }
}
