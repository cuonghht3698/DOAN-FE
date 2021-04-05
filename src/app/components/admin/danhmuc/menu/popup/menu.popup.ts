import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from 'src/app/services/danhmuc/menu.service';
import { GuidId } from 'src/app/services/ERole';

@Component({
  selector: 'menu-app',
  templateUrl: './menu.popup.html',
})
export class MenuPopup implements OnInit {
  constructor(
    private menu: MenuService,
    private toastr: ToastrService,
    private dialog: MatDialogRef<MenuPopup>,
    @Inject(MAT_DIALOG_DATA) public dataMenu: any
  ) {}
  idEmpty = GuidId.EmptyId;
  data = {
    Id: GuidId.EmptyId,
    Icon: '',
    Ten: '',
    Controller: '',
    Link: '',
    MoTa: '',
    IsParent: false,
    IdParent: null,
  };
  Close() {
    this.dialog.close();
  }
  Clear() {
    this.data = {
      Id: GuidId.EmptyId,
      Icon: '',
      Ten: '',
      Controller: '',
      Link: '',
      MoTa: '',
      IsParent: false,
      IdParent: null,
    };
  }
  ngOnInit() {
    this.GetParent();
    if (this.dataMenu) {
      this.data = {
        Id: this.dataMenu.id,
        Icon: this.dataMenu.icon,
        Ten: this.dataMenu.ten,
        Controller: this.dataMenu.controller,
        Link: this.dataMenu.link,
        MoTa: this.dataMenu.mota,
        IsParent: this.dataMenu.isParent,
        IdParent: this.dataMenu.idParent,
      };
    }
  }
  dsParent: any;
  GetParent() {
    this.menu.getParent().subscribe((res) => {
      this.dsParent = res;
      console.log(res);
    });
  }
  ThemMenu() {
    this.menu.Create(this.data).subscribe((res) => {
      this.toastr.success('Thêm menu thành công.', 'Thông báo!');
      this.Clear();
      this.Close();
    });
  }

  SuaMenu() {
    this.menu.Update(this.data).subscribe((res) => {
      this.toastr.success('Sửa menu thành công.', 'Thông báo!');
      this.Close();
    });
  }
}
