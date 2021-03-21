import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TinhThanhService } from 'src/app/services/danhmuc/tinhthanh.service';
import { TinhThanhDialog } from './popup/tinhthanh.popup';

@Component({
  selector: 'app-tinhthanh',
  templateUrl: './tinhthanh.component.html',
  styleUrls: ['./tinhthanh.component.css'],
})
export class TinhthanhComponent implements OnInit {
  constructor(
    private toarst: ToastrService,
    private tinhthanh: TinhThanhService,
    private dialog: MatDialog
  ) { }
  searchTT = {
    sSearch: '',
    pageIndex: 0,
    pageSize: 10,
  };
  dsTinhThanh;
  TotalItem = 0;
  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    this.tinhthanh.GetPage(this.searchTT).subscribe(
      (res: any) => {


        this.dsTinhThanh = res.list;
        this.TotalItem = res.total;
      },
      (err) => {

      }
    );
  }

  OpenDiaLog(item) {
    const dialog = this.dialog.open(TinhThanhDialog, {
      width: '600px',
      height: '500px',
      data: item,
      disableClose: true
    });
    dialog.afterClosed().subscribe((res) => {

      this.getPage();
    })
  }

  DeleteById(id) {
    this.tinhthanh.Delete(id).subscribe((res: any) => {
      this.toarst.success(res, "Thông báo");
      this.getPage();

    },
      (err: any) => {
        this.toarst.error(err, "Thông báo");

      }
    )
  }

  getPaginate(event) {
    this.searchTT.pageIndex = event.pageIndex;
    this.searchTT.pageSize = event.pageSize;
    this.getPage();
  }
}
