
import { TinhThanhService } from './../../../../../services/danhmuc/tinhthanh.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TudienService } from 'src/app/services/danhmuc/tudien.service';
import { GuidId } from 'src/app/services/ERole';

@Component({
  selector: 'dialog-tinhthanh',
  templateUrl: './tinhthanh.poup.html',
})
export class TinhThanhDialog implements OnInit {
  dataTinhThanh = {
    Id: GuidId.EmptyId,
    Ten: '',
    Active: true,
    UuTien: 1,
    MoTa: '',
    ParentId: null,
    IdLoaiTinhThanh: null,
  };
  dsLoaiTinhThanh:any;
  constructor(
    private dialog: MatDialogRef<TinhThanhDialog>,
    @Inject(MAT_DIALOG_DATA) public data,
    private toarst: ToastrService,
    private tudien : TudienService,
    private tinhthanh:TinhThanhService
  ) {}

  ngOnInit() {
    if(this.data){
      const data = this.data;
      this.dataTinhThanh = {
        Id: data.id,
        Ten: data.ten,
        Active: data.active,
        UuTien: data.uuTien,
        MoTa: data.moTa,
        ParentId: data.parentId,
        IdLoaiTinhThanh: data.idLoaiTinhThanh
      };
    }
    this.getDSLoaiTinhThanh();
  }
  getDSLoaiTinhThanh(){
    this.tudien.getByLoai('LoaiTinhThanh').subscribe((res:any)=>{
      this.dsLoaiTinhThanh= res;

    })
  }
  CreateOrUpdate() {
    console.log(this.dataTinhThanh);
    
    if (!this.data) {
      this.tinhthanh.Create(this.dataTinhThanh).subscribe(
        (res) => {
          this.toarst.success('Thêm thành công !', 'Thông báo');
        },
        (err) => {
          console.log(err);
          this.toarst.error('Thao tác thất bại!', 'Thông báo');
        }
      );
    } else {
      this.tinhthanh.Update(this.dataTinhThanh).subscribe(
        (res) => {
          this.toarst.success('Cập nhật thành công !', 'Thông báo');
        },
        (err) => {
          console.log(err);
          this.toarst.error('Thao tác thất bại!', 'Thông báo');
        }
      );
    }
  }
  ClosePopup(){
    this.dialog.close();
  }
}
