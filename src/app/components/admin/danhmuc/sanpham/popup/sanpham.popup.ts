import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CauHinhService } from 'src/app/services/danhmuc/cauhinh.service';
import { SanPhamService } from 'src/app/services/danhmuc/sanpham.service';
import { TudienService } from 'src/app/services/danhmuc/tudien.service';
import { GuidId } from 'src/app/services/ERole';

@Component({
  selector: 'sanpham-pop',
  templateUrl: './sanpham.popup.html',
})
export class PopupSanPham implements OnInit {
  constructor(
    private dialog: MatDialogRef<PopupSanPham>,
    @Inject(MAT_DIALOG_DATA) public data,
    private sp: SanPhamService,
    private toastr: ToastrService,
    private tudien: TudienService,
    private cauhinh: CauHinhService
  ) {}
  IdNull = GuidId.EmptyId;
  dsLoaiSp;
  dataSP: SanPhamModel = {
    Id: GuidId.EmptyId,
    CauHinhId: null,
    Color: '',
    Gia: 0,
    KhoId: null,
    KhuyenMai: 0,
    LoaiSPId: null,
    MoTa: '',
    NguoiNhapId: null,
    NhaCungCapId: null,
    SeriesNumber: '',
    Ten: '',
    TenNgan: '',
    ThoiGianDong: new Date(),
    ThoiGianTao: new Date(),
    ViewCount: 0,
    Rate: 0,
    TrangThaiId: null,
    Active: true,
  };
  dsLoaiCauHinh;
  dsCauHinh;
  checkDsCh;
  ngOnInit() {
    console.log(this.data);

    this.getLoaiSanPham();

    if (this.data) {
      const item = this.data;
      this.dataSP = {
        Id: item.id,
        CauHinhId: item.cauHinhId,
        Color: item.color,
        Gia: item.gia,
        KhoId: item.khoId,
        KhuyenMai: item.khuyenMai,
        LoaiSPId: item.loaiSpId,
        MoTa: item.moTa,
        NguoiNhapId: item.nguoiNhapId,
        NhaCungCapId: item.nhaCungCapId,
        SeriesNumber: item.seriesNumber,
        Ten: item.ten,
        TenNgan: item.tenNgan,
        ThoiGianDong: item.thoiGianDong,
        ThoiGianTao: item.thoiGianTao,
        ViewCount: item.viewCount,
        Rate: item.rate,
        TrangThaiId: item.trangThaiId,
        Active: item.active,
      };
    }
  }

  SelectItem(item) {
    this.dataSP = {
      Id: item.id,
      CauHinhId: item.cauHinhId,
      Color: item.color,
      Gia: item.gia,
      KhoId: item.khoId,
      KhuyenMai: item.khuyenMai,
      LoaiSPId: item.loaiSpId,
      MoTa: item.moTa,
      NguoiNhapId: item.nguoiNhapId,
      NhaCungCapId: item.nhaCungCapId,
      SeriesNumber: item.seriesNumber,
      Ten: item.ten,
      TenNgan: item.tenNgan,
      ThoiGianDong: item.thoiGianDong,
      ThoiGianTao: item.thoiGianTao,
      ViewCount: item.viewCount,
      Rate: item.rate,
      TrangThaiId: item.trangThaiId,
      Active: item.active,
    };
  }

  getLoaiSanPham() {
    this.tudien.getByLoai('LoaiCauHinh').subscribe((res: any) => {
      this.dsLoaiSp = res;
      console.log(res);
    });
  }

  getLoaiCauHinh(id) {
    this.cauhinh.FindByLoai(id).subscribe((res: any) => {
      this.dsCauHinh = res;
      console.log(res);
    });
  }
  CreateOrUpdate() {
    console.log(this.dataSP);

    if (!this.data) {
      this.sp.Create(this.dataSP).subscribe(
        (res) => {
          this.toastr.success('Thêm thành công !', 'Thông báo');
        },
        (err) => {
          console.log(err);
          this.toastr.error('Thao tác thất bại!', 'Thông báo');
        }
      );
    } else {
      this.sp.Update(this.dataSP).subscribe(
        (res) => {
          this.toastr.success('Cập nhật thành công !', 'Thông báo');
        },
        (err) => {
          console.log(err);
          this.toastr.error('Thao tác thất bại!', 'Thông báo');
        }
      );
    }
  }

  Clear() {}
  ClosePopup() {
    this.dialog.close();
  }
}
export interface SanPhamModel {
  Id: string;
  Ten: string;
  TenNgan: string;
  MoTa: string;
  ViewCount: number;
  ThoiGianTao: Date;
  ThoiGianDong: Date;
  SeriesNumber: string;
  Color: string;
  Gia: number;
  NhaCungCapId: string;
  NguoiNhapId: string;
  KhoId: string;
  LoaiSPId: string;
  KhuyenMai: number;
  CauHinhId: string;
  Rate: number;
  TrangThaiId: string;
  Active: boolean;
}
