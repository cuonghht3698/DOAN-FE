import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { CartService } from 'src/app/services/danhmuc/cart.service';
import { TudienService } from 'src/app/services/danhmuc/tudien.service';
import * as moment from 'moment';
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
    TuNgay: '',
    DenNgay: moment().format(),
  };
  total = 0;
  dsTrangThai = [];
  ngOnInit(): void {
    this.Search.TuNgay = moment().add(-1, 'day').format();
    this.getTrangThai();
    this.getCart();
  }
  getCart() {
    var user = this.auth.getUserLocal();
    if (user) {
      this.cart.ShowPage(this.Search).subscribe((res: any) => {
        this.dataSource = res;
        this.total = res.length;
      });
    }
  }
  getPaginate(event) {
    this.Search.PageIndex = event.pageIndex;
    this.Search.PageSize = event.pageSize;
    this.getCart();
  }
  getTrangThai() {
    this.tudien.getByLoai('TrangThaiGiaoDich').subscribe((res: any) => {
      this.dsTrangThai = res;
      this.Search.TrangThaiId = res[0].id;
    });
  }
}
