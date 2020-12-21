import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SanPhamService } from './../../../../services/danhmuc/sanpham.service';
import { Component, OnInit } from '@angular/core';
import { PopupSanPham, SanPhamModel } from './popup/sanpham.popup';

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css'],
})
export class SanphamComponent implements OnInit {
  constructor(
    private sp: SanPhamService,
    private toarst: ToastrService,
    private dialog: MatDialog
  ) {}
  searchSP = {
    sSearch: '',
    pageIndex: 1,
    pageSize: 10,
  };
  dsSanPham;
  TotalItem;
  ngOnInit(): void {
    this.getPage();
  }
  OpenDiaLog(item) {
    console.log(item);

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
    this.sp.GetPage(this.searchSP).subscribe(
      (res: any) => {
        this.dsSanPham = res.list;
        this.TotalItem = res.total;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
