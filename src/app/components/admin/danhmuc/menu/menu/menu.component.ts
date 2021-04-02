import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from 'src/app/services/danhmuc/menu.service';
import { MenuPopup } from '../popup/menu.popup';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(
    private menu: MenuService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  dataMenu: any;
  sSearch = {
    sSearch: '',
    pageIndex: 0,
    pageSize: 10,
  };
  TotalItem = 0;
  ngOnInit(): void {
    this.getAll();
  }
  data: any;
  getAll() {
    this.menu.getPage(this.sSearch).subscribe((res:any) => {
      this.data = res.list;
      this.TotalItem = res.total;
    });
  }

  OpenPopup(item: any) {
    var dia = this.dialog.open(MenuPopup, {
      width: '700px',
      disableClose: true,
      data: item,
    });
    dia.afterClosed().subscribe((res) => {
      this.getAll();
    });
  }
  getPaginate(event) {
    this.sSearch.pageIndex = event.pageIndex;
    this.sSearch.pageSize = event.pageSize;
    this.getAll();

  }

  Delete(Id: any) {
    if (confirm('Xóa?'))
      this.menu.Delete(Id).subscribe((res) => {
        this.toastr.success('Thêm menu thành công.', 'Thông báo!');
        this.getAll();
      });
  }
}
