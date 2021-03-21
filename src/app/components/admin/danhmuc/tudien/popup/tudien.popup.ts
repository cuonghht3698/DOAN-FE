
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { LoaitudienService } from 'src/app/services/danhmuc/loaitudien.service';
import { TudienService } from 'src/app/services/danhmuc/tudien.service';
import { GuidId } from 'src/app/services/ERole';

@Component({
  selector: 'popup-tudien',
  templateUrl: './tudien.popup.html',
  styleUrls: ['./tudien.popup.css'],
})
export class PopTuDien implements OnInit {
  TuDien: TuDien = {
    Id: GuidId.EmptyId,
    MaTuDien: '',
    Active: true,
    LoaiTuDienId: GuidId.EmptyId,
    GhiChu: '',
    Ten: '',
    TenNgan: '',
    UuTien: 0,
  };
  dsLoaiTuDien: object[];
  IdNull = GuidId.EmptyId;
  constructor(
    private popupRes: MatDialogRef<PopTuDien>,
    @Inject(MAT_DIALOG_DATA) public data,
    private tudien: TudienService,
    private toarst: ToastrService,
    private loaitudien: LoaitudienService
  ) {}

  ngOnInit() {
    this.getLoaiTuDien();
    if(this.data.ob){
      this.TuDien.Id = this.data.ob.id;
      this.TuDien.MaTuDien = this.data.ob.maTuDien;
      this.TuDien.Active = this.data.ob.active;
      this.TuDien.GhiChu = this.data.ob.ghiChu;
      this.TuDien.LoaiTuDienId = this.data.ob.loaiTuDienId;
      this.TuDien.UuTien = this.data.ob.uuTien;
      this.TuDien.Ten = this.data.ob.ten;
      this.TuDien.TenNgan = this.data.ob.tenNgan;

    }
  }
  //GET LOAI TU DIEN
  getLoaiTuDien(){
    this.loaitudien.GetAll().subscribe((res:any)=>{
      this.dsLoaiTuDien = res;

    });
  }

  // THEM LOAI TU DIEN
  CreateOrUpdate() {
    if (this.TuDien.Id == this.IdNull) {
      this.tudien.Create(this.TuDien).subscribe(
        (res) => {
          this.toarst.success('Cập nhật thành công !', 'Thông báo');
        },
        (err) => {

          this.toarst.error('Thao tác thất bại!', 'Thông báo');
        }
      );
    } else {
      this.tudien.Update(this.TuDien).subscribe(
        (res) => {
          this.toarst.success('Cập nhật thành công !', 'Thông báo');
        },
        (err) => {

          this.toarst.error('Thao tác thất bại!', 'Thông báo');
        }
      );
    }
  }

  //xoa textbox
  Clear() {
    this.TuDien.Id = GuidId.EmptyId;
    this.TuDien.UuTien = 0;
    this.TuDien.Active = true;
    this.TuDien.LoaiTuDienId = GuidId.EmptyId;
    this.TuDien.GhiChu = '';
    this.TuDien.TenNgan = '';
    this.TuDien.Ten = '';
  }
  ClosePopup() {
    this.popupRes.close();
  }
}

export interface TuDien {
  Id: string;
  LoaiTuDienId: string;
  MaTuDien:string,
  TenNgan: string;
  Ten: string;
  GhiChu: string;
  UuTien: number;
  Active: boolean;
}
