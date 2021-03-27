import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { TrangThaiGiaoDich } from 'src/app/services/constrans';
import { CartService } from 'src/app/services/danhmuc/cart.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chitiet-donhang',
  templateUrl: './chitiet-donhang.component.html',
  styleUrls: ['./chitiet-donhang.component.css'],
})
export class ChitietDonhangComponent implements OnInit {
  constructor(
    private cart: CartService,
    private router: ActivatedRoute,
    private user: UserService,
    private toarst: ToastrService,
    private auth: AuthenticationService
  ) {}
  dataCartDetail: [];
  dataUser: any = {
    hoTen: '',
    gioThieu: '',
    soDienThoai: '',
    gioiTinh: '',
    email: '',
  };
  dataCart: any = {
    diaChi: '',
    sdt: '',
    tinNhan: '',
    tongTien: 0,
  };
  ngOnInit(): void {
    this.router.queryParams.subscribe((res) => {
      this.getDonHangDetail(res.id);
      this.getCart(res.id);
    });
  }
  url = environment.ApiUrl + 'anh/get/';
  getDonHangDetail(id) {
    this.cart.ShowShoppingCartById(id).subscribe((res: any) => {
      this.dataCartDetail = res;
    });
  }

  getCart(id) {
    this.cart.GetCartId(id).subscribe((res: any) => {
      this.dataCart = res;
      console.log(res);

      this.getUser(res.userId);
    });
  }
  getUser(id) {
    this.user.getProfileById(id).subscribe((res) => {
      this.dataUser = res;
    });
  }

  GiaoHang() {
    let user = this.auth.getUserLocal();

    var data = {
      Id: this.dataCart.id,
      NhanVienId: user.id,
    };
    this.cart.DatHang(data).subscribe((res) => {
      this.toarst.success('Thao tác thành công', 'Thông báo!');
      this.getCart(data.Id);
    });
  }
}
