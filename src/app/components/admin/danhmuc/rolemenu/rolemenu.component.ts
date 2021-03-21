import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from 'src/app/services/danhmuc/menu.service';
import { RoleMenuService } from 'src/app/services/danhmuc/rolemenu.service';
import { GuidId } from 'src/app/services/ERole';

@Component({
  selector: 'app-rolemenu',
  templateUrl: './rolemenu.component.html',
  styleUrls: ['./rolemenu.component.css'],
})
export class RolemenuComponent implements OnInit {
  constructor(
    private UserRoleMenu: RoleMenuService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private menu: MenuService,
    private route: ActivatedRoute
  ) {}
  dataRoleMenu: any;
  dataMenu: any;
  Count = 0;
  data = {
    Id: GuidId.EmptyId,
    RoleId: GuidId.EmptyId,
    MenuId: GuidId.EmptyId,
    UuTien: this.Count ? 0 : this.Count + 1,
    Mota: '',
    ParentId: null,
  };
  IdRole: any;
  ngOnInit(): void {
    this.IdRole = this.route.snapshot.paramMap.get('id');
    this.data.RoleId = this.IdRole;
    this.getRoleMenu();
    this.getAllMenu();
  }
  getRoleMenu() {
    this.UserRoleMenu.getRoleMenu(this.IdRole).subscribe((res:any) => {
      this.dataRoleMenu = res;
      this.Count = res.length;
    });
  }
  getAllMenu() {
    this.menu.getAll().subscribe((res: any) => {
      this.dataMenu = res;
    });
  }

  ThemRoleMenu(item) {
    this.data.MenuId = item;
    this.UserRoleMenu.Create(this.data).subscribe((res) => {
      this.getRoleMenu();
    },err=>{
      this.toastr.error("Đã có mục này","Thông báo!");
    });
  }
  XoaRoleMenu(id) {
    this.UserRoleMenu.Delete(id).subscribe((res) => {
      //this.toastr.success('Xóa menu thành công', 'Thông báo!');
      this.getRoleMenu();
    });
  }
}
