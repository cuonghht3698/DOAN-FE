import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../../../services/user/user.service';
import { GuidId } from './../../../../../services/ERole';
import { UserModel } from './../../../../../models/UserModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/danhmuc/role.service';

@Component({
  selector: 'Pop-User',
  templateUrl: './userprofile.popup.html',
})
export class PopupUserProfile implements OnInit {
  constructor(
    private Dialog: MatDialogRef<PopupUserProfile>,
    @Inject(MAT_DIALOG_DATA) public data,
    private user: UserService,
    private toarst: ToastrService,
    private role: RoleService
  ) {}
  dataChange: UserModel = {
    DiaChi: '',
    Email: '',
    GioiThieu: '',
    HoTen: '',
    Id: null,
    Role: '',
    Sdt: '',
    TenKhongDau: '',
    NgaySinh: new Date(),
    Username: '',
    Password:''
  };
  dsRole: any;
  getRole() {
    this.role.getAll().subscribe((res)=>{
      this.dsRole = res;
    })
  }
  IdNull = GuidId.EmptyId;
  ngOnInit() {
    this.getRole();
    if (this.data) {
      var d = this.data;
      this.dataChange.Id = d.id;
      this.dataChange.Role = d.code;
      this.dataChange.Sdt = d.soDienThoai;
      this.dataChange.TenKhongDau = d.tenKhongDau;
      this.dataChange.NgaySinh = d.ngaySinh;
      this.dataChange.Username = d.username;
      this.dataChange.Email = d.email;
      this.dataChange.DiaChi = d.diaChi;
      this.dataChange.GioiThieu = d.gioiThieu;
      this.dataChange.HoTen = d.hoTen;
    }
  }

  ClosePopup() {
    this.Dialog.close();
  }

  Clear() {}

  CreateOrUpdate() {
    if (this.dataChange.Id != null) {
      this.user.updateUser(this.dataChange).subscribe(
        (res) => {
          this.toarst.success('Cập nhật thành công !', 'Thông báo');
          this.ClosePopup();
        },
        (err) => {
          this.toarst.error('Thao tác thất bại!', 'Thông báo');
        }
      );
    } else {
      // this.user.create(this.TuDien).subscribe(
      //     (res) => {
      //         this.toarst.success('Cập nhật thành công !', 'Thông báo');
      //     },
      //     (err) => {
      //         this.toarst.error('Thao tác thất bại!', 'Thông báo');
      //     }
      // );
    }
  }
}
