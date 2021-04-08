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
  dataRoleMenu = [
    // {
    //   label: 'Item 1 (with Font awesome icon)',
    //   faIcon: 'fab fa-500px',
    //   items: [
    //     {
    //       label: 'Item 1.1',
    //       link: '/item-1-1',
    //       faIcon: 'fab fa-accusoft'
    //     },
    //     {
    //       label: 'Item 1.2',
    //       faIcon: 'fab fa-accessible-icon',
    //     }
    //   ]
    // },
  ];

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
    console.log(this.IdRole);
  }
  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    classname: 'my-custom-class',
    listBackgroundColor: `3445b4`,
    fontColor: `#fffefa`,
    backgroundColor: `#3445b4`,
    selectedListFontColor: `#f0e9cc`,
    highlightOnSelect: true,
    collapseOnSelect: true,
    useDividers: false,
    rtlLayout: false,
  };
  Search = '';
  selectedItem(item) {}
  getRoleMenu() {
    // chưa có trong menu
    this.UserRoleMenu.getRoleMenu(this.IdRole).subscribe((res: any) => {
      this.dataRoleMenu = res;

      //this.Count = res.length;
    });
  }
  UpdateUuTien(Id, UuTien) {
    // chưa có trong menu
    this.UserRoleMenu.UpdateUuTien(Id, UuTien).subscribe((res: any) => {
      //this.getRoleMenu();
    });
  }
  getAllMenu() {
    this.menu.getThemRole(this.Search).subscribe((res: any) => {
      this.dataMenu = res;
    });
  }

  ThemRoleMenu(item) {
    this.data.MenuId = item;
    this.UserRoleMenu.Create(this.data).subscribe(
      (res) => {
        this.getRoleMenu();
      },
      (err) => {
        this.toastr.error('Đã có mục này', 'Thông báo!');
      }
    );
  }
  XoaRoleMenu(id, menuId, IsParent) {
    if (IsParent) {
      var r = confirm('Xóa mục chính sẽ xóa các mục con? Tiếp tục!');
      if (r == false) {
        return;
      }
    }
    this.UserRoleMenu.Delete(id, menuId, this.IdRole).subscribe((res) => {
      this.toastr.success('Xóa menu thành công', 'Thông báo!');
      this.getRoleMenu();
    });
  }
}
