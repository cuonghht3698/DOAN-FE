import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaiGiaoDich, TrangThaiGiaoDich } from 'src/app/services/constrans';
import { CartService } from 'src/app/services/danhmuc/cart.service';
import { CartDetailService } from 'src/app/services/danhmuc/cartdetail.service';
import { GuidId } from 'src/app/services/ERole';
import { environment } from 'src/environments/environment';
import { CartModel } from '../detail/detail.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  constructor(
    private ct: CartService,
    private cd: CartDetailService,
    private toarst: ToastrService
  ) {}
  UserId = JSON.parse(localStorage.getItem('user'))[0].id;
  dataCartDetail: any;
  url = environment.ApiUrl + 'anh/get/';
  total = 0;
  check = false;
  ngOnInit(): void {
    this.getShoppingCart();
    this.getCart();
  }

  dataCart: CartModel = {
    Id: GuidId.EmptyId,
    TinNhan: '',
    ThoiGianTao: new Date(),
    LoaiGiaoDich: LoaiGiaoDich.MuaHang,
    UserId: JSON.parse(localStorage.getItem('user'))[0].id,
    TrangThai: TrangThaiGiaoDich.DaDatHang,
    NhanVienId: null,
    DiaChi: '',
    TongTien: 0,
  };
  getCart() {
    this.ct.CheckCart(this.UserId).subscribe((res: any) => {
      console.log(res);

      this.dataCart.Id = res[0].id;
    });
  }

  getShoppingCart() {
    this.ct.ShowShoppingCart(this.UserId).subscribe((res: any) => {
      console.log(res);
      this.dataCartDetail = res;
      if (res.length > 0) {
        this.check = true;
        this.total = 0;
        res.forEach((e) => {
          this.total += e.soLuong * e.gia;
        });
        this.dataCart.TongTien = this.total;
      }
    });
  }
  DatHang() {
    this.ct.ChangTrangThai(this.dataCart).subscribe((res) => {
      this.toarst.success('Thông báo!', 'Đặt hàng thành công!');
      this.getShoppingCart();
      this.check = false;
      this.toarst.success('Thông báo', 'Đặt hàng thành công!');
    });
  }

  UpSL(item) {
    this.cd
      .UpdateSL(item.idCartDetail, Number.parseInt(item.soLuong) + 1)
      .subscribe((res) => {
        this.toarst.success('ok');
        this.getShoppingCart();
      });
  }

  GiamSL(item) {
    if (item.soLuong == 1) {
      return;
    }
    this.cd
      .UpdateSL(item.idCartDetail, Number.parseInt(item.soLuong) - 1)
      .subscribe((res) => {
        this.getShoppingCart();
      });
  }
  Delete(id) {
    this.cd.Delete(id).subscribe((res) => {
      this.toarst.success('Thông báo', 'Xóa thành công');
      this.getShoppingCart();
    });
  }
  ChangeSL(event, item) {
    let soluong = event;
    let id = item.idCartDetail;
    if (event > 0) {
      if (event > item.soLuong) {
        this.toarst.info(
          'Số lượng ' + item.tenSp +' trong kho hiện tại là ' + item.soLuong + ' !',
          'Thông báo'
        );
        this.cd.UpdateSL(id, item.soLuong).subscribe((res) => {});
        this.getShoppingCart();
      }
      else
      this.cd.UpdateSL(id, soluong).subscribe((res) => {});
    } else {
      this.cd.UpdateSL(id, 1).subscribe((res) => {
        this.getShoppingCart();
      });
    }
  };


}
