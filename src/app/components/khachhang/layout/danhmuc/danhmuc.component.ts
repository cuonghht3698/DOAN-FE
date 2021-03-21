import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SanPhamService } from 'src/app/services/danhmuc/sanpham.service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { environment } from 'src/environments/environment';
import { TudienService } from 'src/app/services/danhmuc/tudien.service';
import { MaTuDien } from 'src/app/services/constrans';
@Component({
  selector: 'app-danhmuc',
  templateUrl: './danhmuc.component.html',
  styleUrls: ['./danhmuc.component.css'],
})
export class DanhmucComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private sp: SanPhamService,
    private td: TudienService,
    private r: Router
  ) {}
  sSearch = {
    search: '',
    pageIndex: 0,
    pageSize: 20,
    LoaiSP: '',
    HangSX: '',
  };
  slides = [
    { image: '/assets/img/h4-slide.png' },
    { image: '/assets/img/h4-slide2.png' },
    { image: '/assets/img/h4-slide3.png' },
    { image: '/assets/img/h4-slide4.png' },
    { image: '/assets/img/h4-slide7.png' },
  ];
  dsSanPham = [];
  dsLoaiSP = [];
  dsHangSX = [];

  total: number = 0;
  url = environment.ApiUrl + 'anh/get/';
  ngOnInit(): void {
    this.router.queryParams.subscribe((res: any) => {
      this.sSearch.LoaiSP = res.loai;
      this.sSearch.HangSX = res.hang;
    });
    this.getLoaiSP();
    this.getHangSanXuat();
    this.getPage();
  }

  getPage() {
    this.sp.showPageDanhMuc(this.sSearch).subscribe((res: any) => {
      this.dsSanPham = res.list;
      this.total = res.total;
    });
  }
  LocTheoHang(ma) {
    this.route.navigate([], {
      queryParams: { hang: ma },
      queryParamsHandling: 'merge',
    });
    this.sSearch.HangSX = ma;
    this.getPage();
  }
  LocLoaiSP(loai){
    this.route.navigate([], {
      queryParams: { loai: loai },
      queryParamsHandling: 'merge',
    });
    this.sSearch.LoaiSP = loai;
    this.getPage();
  }
  getHangSanXuat() {
    this.td.getByLoai(MaTuDien.HangSanXuat).subscribe((res: any) => {
      this.dsHangSX = res;

    });
  }
  getLoaiSP() {
    this.td.getByLoai(MaTuDien.LoaiSanPham).subscribe((res: any) => {
      this.dsLoaiSP = res;

    });
  }
  GoToDetail(item) {
    this.r.navigate(['shop/chitiet/'], { queryParams: { id: item.id } });
  }
}
