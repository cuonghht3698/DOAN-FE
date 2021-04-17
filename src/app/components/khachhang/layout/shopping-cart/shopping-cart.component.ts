import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { LoaiGiaoDich, TrangThaiGiaoDich } from 'src/app/services/constrans';
import { CartService } from 'src/app/services/danhmuc/cart.service';
import { CartDetailService } from 'src/app/services/danhmuc/cartdetail.service';
import { EmailService } from 'src/app/services/danhmuc/email.service';
import { GuidId } from 'src/app/services/ERole';
import { DataService } from 'src/app/services/share/data.share';
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
    private routerA: ActivatedRoute,
    private email: EmailService,
    public upCart: DataService,
    private cookieService: CookieService
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
  chuaDangNhap = false;
  ngOnInit(): void {
    if (this.UserId == GuidId.EmptyId) {
      this.chuaDangNhap = true;
    }
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
    DiaChi: JSON.parse(localStorage.getItem('user'))[0].diaChi,
    TongTien: 0,
    Sdt: JSON.parse(localStorage.getItem('user'))[0].sdt,
    NgayHoanThanh: null,
    Email: '',
    HoTen: '',
    ClientID: '',
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
    Sdt: JSON.parse(localStorage.getItem('user'))[0].sdt,
    NgayHoanThanh: null,
    Email: '',
    HoTen: '',
    ClientID: '',
  };
  TenTrangThai = '';
  getCartId(Id) {
    this.ct.GetCartId(Id).subscribe((res: any) => {
      this.dataCart.Id = res.id;
      if (res.diaChi != '') {
        this.dataCart.DiaChi = res.diaChi;
      } else {
        this.dataCart.DiaChi = JSON.parse(
          localStorage.getItem('user')
        )[0].diaChi;
      }
      this.dataCart.TinNhan = res.tinNhan;
      this.dataCart.TrangThai = res.trangThai.maTuDien;
      this.TenTrangThai = res.trangThai.ten;
      this.dataCart.Sdt = res.sdt;
      this.dataCart.Email =
        res.email != ''
          ? res.email
          : (this.dataCart.Email = JSON.parse(
              localStorage.getItem('user')
            )[0].email);
      this.dataCart.HoTen =
        res.hoTen != ''
          ? res.hoTen
          : (this.dataCart.HoTen = JSON.parse(
              localStorage.getItem('user')
            )[0].email);
      if (res.sdt != '') {
        this.dataCart.Sdt = res.sdt;
      }
    });
  }
  HuyDon() {
    this.dataCart.TrangThai = TrangThaiGiaoDich.DaHuy;
    this.ct.ChangTrangThai(this.dataCart).subscribe((res) => {
      this.toarst.success('Hủy đơn thành công', 'Thông báo!');
    });
  }
  getCart() {
    var ClientId = this.cookieService.get('ClientId');
    this.ct.CheckCart(this.UserId, ClientId).subscribe((res: any) => {
      // CHECK CO CART NAO K
      if (res[0]?.id) {
        this.dataCart.Id = res[0].id;
        if (res[0].diaChi != '') {
          this.dataCart.DiaChi = res[0].diaChi;
        } else {
          this.dataCart.DiaChi = JSON.parse(
            localStorage.getItem('user')
          )[0].diaChi;
        }

        this.dataCart.Email = res[0].email
          ? res[0].email
          : (this.dataCart.Email = JSON.parse(
              localStorage.getItem('user')
            )[0].email);
        this.dataCart.HoTen = res[0].hoTen
          ? res[0].hoTen
          : (this.dataCart.HoTen = JSON.parse(
              localStorage.getItem('user')
            )[0].hoTen);

        this.dataCart.TinNhan = res[0].tinNhan;
        this.dataCart.TrangThai = res[0].trangThai.maTuDien;
        if (res[0].sdt != '') {
          this.dataCart.Sdt = res[0].sdt;
        }
        if (this.chuaDangNhap) {
          this.dataCart.Email = '';
          this.dataCart.HoTen = '';
          this.dataCart.DiaChi = '';
          this.dataCart.Sdt = '';
        }
      }
      // Tao cart mới
      else {
        this.ct.CreateNewCart(this.dataNewCart).subscribe((res) => {
          this.dataCart.Id = res[0].id;
          if (res[0].diaChi != '') {
            this.dataCart.DiaChi = res[0].diaChi;
          } else {
            this.dataCart.DiaChi = JSON.parse(
              localStorage.getItem('user')
            )[0].diaChi;
          }
          this.dataCart.TinNhan = res[0].tinNhan;
          this.dataCart.TrangThai = res[0].trangThai.maTuDien;
          if (res[0].sdt != '') {
            this.dataCart.Sdt = JSON.parse(localStorage.getItem('user'))[0].sdt;
          }
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
    var ClientId = this.cookieService.get('ClientId');
    this.ct.ShowShoppingCart(this.UserId, ClientId).subscribe((res: any) => {
      this.dataCartDetail = res;
      console.log(res);
      if (res.length > 0) {
        this.check = true;
        this.total = 0;
        res.forEach((e) => {
          this.dataSentEmail.NoiDung +=
            'Tên sản phẩm : ' +
            e.tenSp +
            ' - ' +
            e.cauHinh +
            ' Giá : ' +
            e.gia +
            ' số lượng : ' +
            e.soLuong +
            ' <br />';
          this.total += e.soLuong * e.gia;
        });
        this.dataSentEmail.NoiDung += 'Tổng tiền ' + this.total + ' đồng <br/>';
        this.dataSentEmail.NoiDung +=
          'Chúng tôi sẽ liên hệ với bạn mong bạn để ý điện thoại! Cảm ơn bạn đã tin tưởng.';
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
    if (
      this.dataCart.HoTen == '' ||
      this.dataCart.DiaChi == '' ||
      this.dataCart.Sdt == ''
    ) {
      this.toarst.info(
        'Họ tên, địa chỉ, số điện thoại không được để trống!',
        'Thông báo'
      );
      return;
    }
    this.dataCart.TrangThai = TrangThaiGiaoDich.DaDatHang;
    this.ct.ChangTrangThai(this.dataCart).subscribe((res) => {
      if (this.checkView) {
        this.getShoppingCartById(this.IdParam);
      } else {
        this.getShoppingCart();
      }
      this.check = false;
      this.upCart.resest();
      this.sentEmail();
      this.toarst.success('Thông báo', 'Đặt hàng thành công!');
    });
  }
  dataSentEmail = {
    Email: '',
    TieuDe: 'Đặt hàng thành công.',
    NoiDung: 'Bao gồm sản phẩm: <br/> ',
  };
  sentEmail() {
    this.dataSentEmail.Email = JSON.parse(
      localStorage.getItem('user')
    )[0].email;
    this.email
      .SentEmail(this.dataSentEmail)
      .then((res) => {
        this.toarst.success('Gửi email thành công!', 'Thông báo!');
      })
      .catch((err) => console.log(err));
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

      this.upCart.update(-1);
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
