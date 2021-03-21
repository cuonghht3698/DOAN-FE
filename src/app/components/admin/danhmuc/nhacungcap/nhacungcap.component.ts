import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { NhaCungCapService } from './../../../../services/danhmuc/nhacungcap.service';
import { Component, OnInit } from '@angular/core';
import { PopupNCC } from './popup/nhacungcap.popup';

@Component({
  selector: 'app-nhacungcap',
  templateUrl: './nhacungcap.component.html',
  styleUrls: ['./nhacungcap.component.css']
})
export class NhacungcapComponent implements OnInit {
  searchNCC = {
    sSearch: '',
    pageIndex: 0,
    pageSize: 10,
  };
  dsNhaCungCap;
  TotalItem
  constructor(private ncc: NhaCungCapService, private dialog: MatDialog,private toarst:ToastrService) { }

  ngOnInit(): void {
    this.getPage();
  }
  OpenDiaLog(item) {
    const dialog = this.dialog.open(PopupNCC, {
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
    this.ncc.Delete(id).subscribe((res: any) => {
      this.toarst.success(res, "Thông báo");
      this.getPage();

    },
      (err: any) => {
        this.toarst.error(err, "Thông báo");

      }
    )
   }

  getPaginate(event) {
    this.searchNCC.pageIndex = event.pageIndex;
    this.searchNCC.pageSize = event.pageSize;
    this.getPage();
   }

  getPage() {
    this.ncc.GetPage(this.searchNCC).subscribe((res: any) => {
      this.dsNhaCungCap = res.list;
      this.TotalItem = res.total;

    }, err => {

    })
  }
}
