import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaTuDien } from 'src/app/services/constrans';
import { AnhService } from 'src/app/services/danhmuc/anh.service';
import { optionservice } from 'src/app/services/danhmuc/optionSp.service';
import { SanPhamService } from 'src/app/services/danhmuc/sanpham.service';
import { TudienService } from 'src/app/services/danhmuc/tudien.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-product',
  templateUrl: './top-product.component.html',
  styleUrls: ['./top-product.component.css'],
})
export class TopProductComponent implements OnInit {
  constructor(
    private anh: AnhService,
    private sp: SanPhamService,
    private tudien: TudienService,
    private option: optionservice,
    private router: Router
  ) {}
  dsMenu: any;
  dsTopDienThoai = [];
  dsTopDienThoaiNhieuView = [];

  move = 0;
  url = environment.ApiUrl + 'anh/get/';
  ngOnInit(): void {
    this.getHangSX();
    this.getSPNhieuView();
  }
  search = {
    sSearch: '',
    pageIndex: 1,
    pageSize: 8,
    OrderByAsc: false,
  };
  searchOp = {
    MaHang: '',
    PageIndex: 1,
    PageSize: 4,
  };
  getSanPham() {
    this.option.GetOptionByHang(this.searchOp).subscribe((res: any) => {
      this.dsTopDienThoai = res;


    });
  }
  Next(){
    this.searchOp.PageIndex +=1;
  }
  Prev(){
    this.searchOp.PageIndex -=1;

  }
  ChonHang(hang){
    this.searchOp.MaHang = hang;
    this.getSanPham();
  }
  ViewMore() {
    if (this.search.pageSize < 32) {
      this.search.pageSize += 4;
      this.getSPNhieuView();
    }
  }
  getSPNhieuView() {
    this.option.GetPage(this.search).subscribe((res: any) => {
      this.dsTopDienThoaiNhieuView = res;
      console.log(res);

    });
  }
  getHangSX() {
    this.tudien.getByLoai(MaTuDien.HangSanXuat).subscribe((res: any) => {
      this.dsMenu = res;
      this.searchOp.MaHang = res[0].maTuDien;
      this.getSanPham();
    });
  }

  GoToDetail(item) {
    //
    this.router.navigate(['shop/chitiet/'], { queryParams: { id: item.id } });
  }
  AddToCart(item) {}
}
