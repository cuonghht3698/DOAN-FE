import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { CartService } from 'src/app/services/danhmuc/cart.service';
import { TudienService } from 'src/app/services/danhmuc/tudien.service';
import * as moment from 'moment';
import { optionservice } from 'src/app/services/danhmuc/optionSp.service';
import { ToastrService } from 'ngx-toastr';
import { TrangThaiGiaoDich } from 'src/app/services/constrans';
import * as _ from "lodash";
@Component({
  selector: 'app-quanly-donghang',
  templateUrl: './quanly-donghang.component.html',
  styleUrls: ['./quanly-donghang.component.css'],
})
export class QuanlyDonghangComponent implements OnInit {
  dataSource = [];
  constructor(
    private cart: CartService,
    private auth: AuthenticationService,
    private tudien: TudienService,
    private option: optionservice,
    private toart:ToastrService
  ) {}

  Search = {
    sSearch: '',
    PageIndex: 0,
    PageSize: 10,
    TrangThaiId: '',
    TuNgay: moment().format(),
    DenNgay: moment().format(),
  };
  total = 0;
  demNgay = 0;
  dsTrangThai = [];
  ngOnInit(): void {
    this.getTrangThai();
    this.CountLocDate();
  }

  getCart() {
    var user = this.auth.getUserLocal();
    if (user) {
      this.Search.TuNgay = moment(this.Search.TuNgay).startOf('day').format();
      this.Search.DenNgay = moment(this.Search.DenNgay).endOf('day').format();
      this.Search.PageIndex = this.Search.PageIndex;
      this.Search.PageSize = this.Search.PageSize;
      this.cart.ShowPage(this.Search).subscribe((res: any) => {
        this.dataSource = res;
        this.total = res.length;
      });
    }

    this.CountLocDate();
  }
  CountLocDate() {
    var count = moment
      .duration(moment(this.Search.DenNgay).diff(this.Search.TuNgay))
      .asDays();
    this.demNgay = Math.round(count);
  }
  getPaginate(event) {
    this.Search.PageIndex = event.pageIndex;
    this.Search.PageSize = event.pageSize;
    this.getCart();
  }
  getTrangThai() {
    this.tudien.getByLoai('TrangThaiGiaoDich').subscribe((res: any) => {
      this.dsTrangThai = _.filter(res, x => x.maTuDien == TrangThaiGiaoDich.DaDatHang || x.maTuDien == TrangThaiGiaoDich.DaHoanThanh || x.maTuDien == TrangThaiGiaoDich.DangGiaoHang);
      this.dsTrangThai.splice(0, 0, { id: '', ten: 'Trạng thái' });
      this.Search.TrangThaiId = '';
      this.getCart();
    });
  }
  HoanThanh(id){

    let user = this.auth.getUserLocal();
    var data = {
      Id: id,
      NhanVienId: user.id
    };

    this.cart.HoanThanh(data).subscribe((res)=>{
      this.toart.success('Hoàn thành đơn thành công', 'Thông báo!');
      this.getCart();
    })
  }
}
