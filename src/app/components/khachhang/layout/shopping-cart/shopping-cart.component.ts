import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private toarst: ToastrService,
    private routerA: ActivatedRoute
  ) {}
  checkView = false;
  IdParam = '';
  checkTrangThai = true;
  UserId = JSON.parse(localStorage.getItem('user'))[0].id;
  dataCartDetail: any;
  url = environment.ApiUrl + 'anh/get/';
  confirmXoa = false;
  total = 0;
  check = false;
  ngOnInit(): void {
    this.routerA.queryParams.subscribe((res) => {
      if (res.Id) {
        this.getShoppingCartById(res.Id);
        this.getCartId(res.Id);
        this.checkView = true;
        this.IdParam = res.Id;
      } else {
        this.getShoppingCart();
        this.getCart();
        this.checkView = false;
      }
    });
  }
  dataNewCart: CartModel = {
    Id: GuidId.EmptyId,
    TinNhan: '',
    ThoiGianTao: new Date(),
    LoaiGiaoDich: LoaiGiaoDich.MuaHang,
    UserId: JSON.parse(localStorage.getItem('user'))[0].id,
    TrangThai: TrangThaiGiaoDich.DangGiaoDich,
    NhanVienId: null,
    DiaChi: '',
    TongTien: 0,
  };

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

  getCartId(Id) {
    this.ct.GetCartId(Id).subscribe((res: any) => {
      this.dataCart.Id = res.id;
      this.dataCart.DiaChi = res.diaChi;
      this.dataCart.TinNhan = res.tinNhan;
      this.dataCart.TrangThai = res.trangThai.maTuDien;
    });
  }

  getCart() {
    this.ct.CheckCart(this.UserId).subscribe((res: any) => {
      // CHECK CO CART NAO K
      if (res[0]?.id) {
        this.dataCart.Id = res[0].id;
        this.dataCart.DiaChi = res[0].diaChi;
        this.dataCart.TinNhan = res[0].tinNhan;
        this.dataCart.TrangThai = res[0].trangThai.maTuDien;
      }
      // Tao cart mới
      else {
        this.ct.CreateNewCart(this.dataNewCart).subscribe((res) => {
          this.dataCart.Id = res[0].id;
          this.dataCart.DiaChi = res[0].diaChi;
          this.dataCart.TinNhan = res[0].tinNhan;
          this.dataCart.TrangThai = res[0].trangThai.maTuDien;
        });
      }
    });
  }

  getShoppingCartById(Id) {
    this.ct.ShowShoppingCartById(Id).subscribe((res: any) => {
      this.dataCartDetail = res;

      if (res.length > 0) {
        this.check = true;
        this.total = 0;
        res.forEach((e) => {
          this.total += e.soLuong * e.gia;
        });
        this.dataCart.TongTien = this.total;
      } else {
        this.check = false;
      }
    });
  }
  getShoppingCart() {
    this.ct.ShowShoppingCart(this.UserId).subscribe((res: any) => {
      this.dataCartDetail = res;
      if (res.length > 0) {
        this.check = true;
        this.total = 0;
        res.forEach((e) => {
          this.total += e.soLuong * e.gia;
        });
        this.dataCart.TongTien = this.total;
      } else {
        this.check = false;
      }
    });
  }
  DatHang() {
    if (this.dataCart.TrangThai != TrangThaiGiaoDich.DangGiaoDich) {
      this.toarst.info('Không thể thay đổi khi đã đặt hàng!', 'Thông báo');
      return;
    }
    if (this.dataCartDetail.length == 0) {
      this.toarst.info('Giỏ hàng của bạn bị trống!!', 'Thông báo');
      return;
    }
    this.dataCart.TrangThai = TrangThaiGiaoDich.DaDatHang;
    this.ct.ChangTrangThai(this.dataCart).subscribe((res) => {
      this.toarst.success('Thông báo!', 'Đặt hàng thành công!');
      if (this.checkView) {
        this.getShoppingCartById(this.IdParam);
      } else {
        this.getShoppingCart();
      }
      this.check = false;
      this.toarst.success('Thông báo', 'Đặt hàng thành công!');
    });
  }

  UpSL(item) {
    if (this.dataCart.TrangThai != TrangThaiGiaoDich.DangGiaoDich) {
      this.toarst.info('Không thể thay đổi khi đã đặt hàng!', 'Thông báo');
      return;
    }
    this.cd
      .UpdateSL(item.idCartDetail, Number.parseInt(item.soLuong) + 1)
      .subscribe((res) => {
        if (this.checkView) {
          this.getShoppingCartById(this.IdParam);
        } else {
          this.getShoppingCart();
        }
      });
  }

  GiamSL(item) {
    if (this.dataCart.TrangThai != TrangThaiGiaoDich.DangGiaoDich) {
      this.toarst.info('Không thể thay đổi khi đã đặt hàng!', 'Thông báo');
      return;
    }
    if (item.soLuong == 1) {
      return;
    }
    this.cd
      .UpdateSL(item.idCartDetail, Number.parseInt(item.soLuong) - 1)
      .subscribe((res) => {
        if (this.checkView) {
          this.getShoppingCartById(this.IdParam);
        } else {
          this.getShoppingCart();
        }
      });
  }
  Delete(id) {
    if (this.dataCart.TrangThai != TrangThaiGiaoDich.DangGiaoDich) {
      this.toarst.info('Không thể thay đổi khi đã đặt hàng!', 'Thông báo');
      return;
    }
    this.cd.Delete(id).subscribe((res) => {
      this.toarst.success('Thông báo', 'Xóa thành công');
      if (this.checkView) {
        this.getShoppingCartById(this.IdParam);
      } else {
        this.getShoppingCart();
      }
    });
  }
  ChangeSL(event, item) {
    if (this.dataCart.TrangThai != TrangThaiGiaoDich.DangGiaoDich) {
      this.toarst.info('Không thể thay đổi khi đã đặt hàng!', 'Thông báo');
      return;
    }
    let soluong = event;
    let id = item.idCartDetail;
    if (event > 0) {
      if (event > item.soLuong) {
        this.toarst.info(
          'Số lượng ' +
            item.tenSp +
            ' trong kho hiện tại là ' +
            item.soLuong +
            ' !',
          'Thông báo'
        );
        this.cd.UpdateSL(id, item.soLuong).subscribe((res) => {});
        if (this.checkView) {
          this.getShoppingCartById(this.IdParam);
        } else this.getShoppingCart();
      } else this.cd.UpdateSL(id, soluong).subscribe((res) => {});
    } else {
      this.cd.UpdateSL(id, 1).subscribe((res) => {
        if (this.checkView) {
          this.getShoppingCartById(this.IdParam);
        } else {
          this.getShoppingCart();
        }
      });
    }
  }
}
