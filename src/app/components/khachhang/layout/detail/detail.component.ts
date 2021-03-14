import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaiGiaoDich, TrangThaiGiaoDich } from 'src/app/services/constrans';
import { CartService } from 'src/app/services/danhmuc/cart.service';
import { CartDetailService } from 'src/app/services/danhmuc/cartdetail.service';
import { optionservice } from 'src/app/services/danhmuc/optionSp.service';
import { GuidId } from 'src/app/services/ERole';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(
    private op: optionservice,
    private router: ActivatedRoute,
    private r: Router,
    private cart: CartService,
    private cartDetail: CartDetailService,
    private toar: ToastrService
  ) {}
  IdSp = GuidId.EmptyId;
  SanPham: any;
  currentOption: string;
  HetHang = false;
  SoLuongKho = 0;
  DataCart: CartModel = {
    Id: GuidId.EmptyId,
    TinNhan: '',
    ThoiGianTao: new Date(),
    LoaiGiaoDich: LoaiGiaoDich.MuaHang,
    UserId: "",
    TrangThai: TrangThaiGiaoDich.DangGiaoDich,
    NhanVienId: null,
    DiaChi: '',
  };
  DataCartDetail: CartDetailModel = {
    Id: GuidId.EmptyId,
    Gia: 0,
    Mau: '',
    CartId: GuidId.EmptyId,
    OptionId: GuidId.EmptyId,
    SanPhamId: GuidId.EmptyId,
    SoLuong: 1,
    ThoiGianTao: new Date(),
    UuTien: 0,
  };

  url = environment.ApiUrl + 'anh/get/';
  ngOnInit(): void {
    this.router.queryParams.subscribe((res) => {
      this.IdSp = res.id;
    });
    this.getSanPham();
    if (JSON.parse(localStorage.getItem('user'))[0].id) {
      this.DataCart.UserId = JSON.parse(localStorage.getItem('user'))[0].id;
      this.CheckCart();
    }

  }
  // cHECK CART
  // Kieemr tra cart co san sang k trang thai giao dich = dang giao dich
  CheckCart() {
    this.cart.CheckCart(this.DataCart.UserId).subscribe((res: any) => {
      console.log(res);
      // CHECK CO CART NAO K
      if (res[0]?.id) {
        this.DataCart.Id = res[0].id;
        this.DataCartDetail.CartId = res[0].id;
      }
      // Tao cart mới
      else {
        this.cart.CreateNewCart(this.DataCart).subscribe((res) => {
          this.DataCart.Id = res[0].id;
          this.DataCartDetail.CartId = res[0].id;
        });
      }
    });
  }

  AddToCart() {
    this.cartDetail
      .CreateNewCartDetail(this.DataCartDetail)
      .subscribe((res) => {
        console.log(res);
        this.toar.success('Thông báo', 'Thêm vào giỏ hàng thành công!');
      });
  }
  // END CHECK CART
  getSanPham() {
    this.op.GetOptionByIdSp(this.IdSp).subscribe((res: any) => {
      this.SanPham = res;
      if (res.length > 0) {
        this.DataCartDetail.SanPhamId = res[0].sanPhamId;
        this.DataCartDetail.SoLuong = 1;
        this.DataCartDetail.SanPhamId = this.IdSp;
        if (res[0].option.length > 0) {
          this.DataCartDetail.OptionId = res[0].option[0].id;
          this.DataCartDetail.Gia = res[0].option[0].gia;
          this.SoLuongKho = res[0].option[0].soLuong;
          this.currentOption =
            res[0].option[0].ram + ' - ' + res[0].option[0].rom;
        }
      } else {
        this.HetHang = true;
      }
      console.log(res);
    });
  }

  GoToDetail(item) {
    this.r.navigateByUrl('shop/chitiet/' + item.id);
  }
  ChonOption(a) {
    this.DataCartDetail.OptionId = a.id;
    this.DataCartDetail.SanPhamId = a.sanPhamId;
    this.DataCartDetail.Gia = a.gia;
    this.SoLuongKho = a.soLuong;
    this.currentOption = a.ram + ' - ' + a.rom;
  }
}

export interface CartDetailModel {
  Id: GuidId.EmptyId;
  CartId: GuidId.EmptyId;
  SoLuong: number;
  ThoiGianTao: Date;
  SanPhamId: GuidId.EmptyId;
  OptionId: GuidId.EmptyId;
  Gia: Number;
  Mau: string;
  UuTien: number;
}
export interface CartModel {
  Id: GuidId.EmptyId;
  TinNhan: string;
  ThoiGianTao: Date;
  LoaiGiaoDich: string;
  UserId: ""
  TrangThai: string;
  NhanVienId: string;
  DiaChi: string;
}
