import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaiGiaoDich, TrangThaiGiaoDich } from 'src/app/services/constrans';
import { CartService } from 'src/app/services/danhmuc/cart.service';
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
    private cart: CartService
  ) {}
  IdSp: string = '';
  SanPham: any;

  AddOption = {
    Id: '',
    IdSanPham: '',
    SoLuong: 1,
    Gia: 0,
  };

  DataCart: CartModel = {
    Id: GuidId.EmptyId,
    TinNhan: '',
    ThoiGianTao: new Date,
    LoaiGiaoDich: LoaiGiaoDich.MuaHang,
    UserId: JSON.parse(localStorage.getItem("user"))[0].id,
    TrangThai: TrangThaiGiaoDich.DangGiaoDich,
    NhanVienId: null,
    DiaChi: ''
  };
  DataCartDetail: CartDetailModel;

  url = environment.ApiUrl + 'anh/get/';
  ngOnInit(): void {
    this.router.queryParams.subscribe((res) => {
      this.IdSp = res.id;
    });
    this.getSanPham();
    this.CheckCart();
  }

  // cHECK CART
  // Kieemr tra cart co san sang k trang thai giao dich = dang giao dich
  CheckCart() {
    this.cart.CheckCart(this.DataCart.UserId).subscribe((res:any)=>{
      console.log(res);
      // CHECK CO CART NAO K
      if (res[0]?.id) {
        this.DataCart.Id = res[0].id;
      }
      // Tao cart mới
      else {
        this.cart.CreateNewCart(this.DataCart).subscribe((res)=>{
          this.DataCart.Id = res[0].id;
        })
      }
    })
  }

  // END CHECK CART
  getSanPham() {
    this.op.GetOptionByIdSp(this.IdSp).subscribe((res: any) => {
      this.SanPham = res;
    });
  }

  GoToDetail(item) {
    this.r.navigateByUrl('shop/chitiet/' + item.id);
  }
  ChonOption(a) {}
}

export interface CartDetailModel {
  Id: GuidId.EmptyId;
  CartId: GuidId.EmptyId;
  SoLuong: number;
  ThoiGianTao: Date;
  SanPhamId: GuidId.EmptyId;
  OptionId: GuidId.EmptyId;
  TrangThaiId: GuidId.EmptyId;
  Gia: Number;
  Mau: string;
}
export interface CartModel {
  Id: GuidId.EmptyId;
  TinNhan: string;
  ThoiGianTao: Date;
  LoaiGiaoDich: string;
  UserId: GuidId.EmptyId;
  TrangThai: string;
  NhanVienId: string;
  DiaChi: string;
}
