import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SanPhamService } from './../../../../services/danhmuc/sanpham.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})
export class SanphamComponent implements OnInit {

  constructor(private sp: SanPhamService, private toarst: ToastrService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getPage();
  }
  OpenDiaLog(item) {
    const dialog = this.dialog.open(PoppupCauHinh, {
      width: '60%',
      height: 'auto',
      data: item,
      disableClose: true
    });
    dialog.afterClosed().subscribe((res) => {
      this.getPage();
    })
  }
  DeleteById(id) {
    this.ch.Delete(id).subscribe((res: any) => {
      this.toarst.success(res, "Thông báo");
      this.getPage();

    },
      (err: any) => {
        this.toarst.error(err, "Thông báo");

      }
    )
  }

  getPaginate(event) {
    this.searchCH.pageIndex = event.pageIndex;
    this.searchCH.pageSize = event.pageSize;
    this.getPage();
  }

  getPage() {
    this.ch.GetPage(this.searchCH).subscribe((res: any) => {
      this.dsCauHinh = res.list;
      this.TotalItem = res.total;
      console.log(res.list);

    }, err => {
      console.log(err);

    })
  }
}
