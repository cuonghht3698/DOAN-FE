import { CauHinhService } from './../../../../services/danhmuc/cauhinh.service';
import { PoppupCauHinh } from './popup/cauhinh.popup';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { NhaCungCapService } from './../../../../services/danhmuc/nhacungcap.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cauhinh',
  templateUrl: './cauhinh.component.html',
  styleUrls: ['./cauhinh.component.css']
})
export class CauhinhComponent implements OnInit {

  searchCH = {
    sSearch: '',
    pageIndex: 0,
    pageSize: 10,
  };
  dsCauHinh;
  TotalItem
  constructor(private ch: CauHinhService, private dialog: MatDialog,
     private toarst: ToastrService, private cauhinh:CauHinhService) { }

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
