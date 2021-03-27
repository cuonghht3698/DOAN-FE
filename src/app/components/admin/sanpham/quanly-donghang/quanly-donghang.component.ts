import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { CartService } from 'src/app/services/danhmuc/cart.service';
import { TudienService } from 'src/app/services/danhmuc/tudien.service';
import * as moment from 'moment';
import { MaTuDien, DateInView } from 'src/app/services/constrans';
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
    private tudien: TudienService
  ) {}

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
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
      this.cart.ShowPage(this.Search).subscribe((res: any) => {
        this.dataSource = res;
        this.total = res.length;
      });
    }
    this.CountLocDate();
  }
  CountLocDate(){
    var count = moment.duration(moment(this.Search.DenNgay).diff(this.Search.TuNgay)).asDays();
    this.demNgay = Math.round(count);
  }
  getPaginate(event) {
    this.Search.PageIndex = event.pageIndex;
    this.Search.PageSize = event.pageSize;
    this.getCart();
  }
  getTrangThai() {
    this.tudien.getByLoai('TrangThaiGiaoDich').subscribe((res: any) => {
      this.dsTrangThai = res;
      this.dsTrangThai.splice(0, 0, { id: '', ten: 'Trạng thái' });
      this.Search.TrangThaiId = res[1].id;
      this.getCart();
    });
  }
}
