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
    private router:Router
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
    pageSize: 2,
    OrderByAsc: false,
  };
  getSanPham(Hang) {
    this.option.GetOptionByHang(Hang).subscribe((res: any) => {
      if (res.length < 4) {
        res.forEach((element) => {
          this.dsTopDienThoai.unshift(element);
        });
      } else {
        this.dsTopDienThoai = res;
      }
    });
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
    });
  }
  getHangSX() {
    this.tudien.getByLoai(MaTuDien.LoaiCauHinh).subscribe((res: any) => {
      this.dsMenu = res;

      this.getSanPham(res[0].maTuDien);
    });
  }

  GoToDetail(item){
    console.log(item);
    
    this.router.navigateByUrl('shop/chitiet/' + item.id);
  }
}
