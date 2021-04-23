import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SanPhamService } from './../../../../services/danhmuc/sanpham.service';
import { Component, OnInit } from '@angular/core';
import { PopupSanPham, SanPhamModel } from './popup/sanpham.popup';
import { TudienService } from 'src/app/services/danhmuc/tudien.service';

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css'],
})
export class SanphamComponent implements OnInit {
  constructor(
    private sp: SanPhamService,
    private toarst: ToastrService,
    private dialog: MatDialog,
    private cm: TudienService
  ) {}
  searchSP = {
    sSearch: '',
    pageIndex: 0,
    pageSize: 10,
    IdLoaiSanPham: '',
    IdHangSanXuat: '',
    GiaTu: 0,
    GiaDen: 0,
    Active: "2",
  };
  dsSanPham;
  TotalItem;
  ngOnInit(): void {
    this.getLoai();
    this.getPage();
  }
  dsLoai: any;
  dsHang: any;
  IdHang = '';
  IdLoai = '';
  getLoai() {
    this.cm.getByLoai('HangSanXuat').subscribe((res) => {
      this.dsHang = res;
    });
    this.cm.getByLoai('LoaiSanPham').subscribe((res) => {
      this.dsLoai = res;
    });
  }

  OpenDiaLog(item) {
    const dialog = this.dialog.open(PopupSanPham, {
      width: '80%',
      height: 'auto',
      data: item,
      disableClose: true,
    });
    dialog.afterClosed().subscribe((res) => {
      this.getPage();
    });
  }
  DeleteById(id) {
    this.sp.Delete(id).subscribe(
      (res: any) => {
        this.toarst.success(res, 'Thông báo');
        this.getPage();
      },
      (err: any) => {
        this.toarst.error(err, 'Thông báo');
      }
    );
  }

  getPaginate(event) {
    this.searchSP.pageIndex = event.pageIndex;
    this.searchSP.pageSize = event.pageSize;
    this.getPage();
  }

  getPage() {
    if (this.searchSP.GiaDen.toString() == '') {
      this.searchSP.GiaDen = 0;
    }
    if (this.searchSP.GiaTu.toString() == '') {
      this.searchSP.GiaTu = 0;
    }
    this.sp.GetPage(this.searchSP).subscribe(
      (res: any) => {
        this.dsSanPham = res.list;
        this.TotalItem = res.total;
      },
      (err) => {}
    );
  }
}
