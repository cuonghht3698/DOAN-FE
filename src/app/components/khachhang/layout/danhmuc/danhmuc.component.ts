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
    sSearch: '',
    pageIndex: 0,
    pageSize: 20,
    LoaiSP: '',
    HangSX: '',
    GiaTu: 0,
    GiaDen: 0,
    Ram:'',
    DungLuong:''
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
      this.sSearch.LoaiSP = res.LoaiSP;
      this.sSearch.sSearch = res.sSearch;
      this.sSearch.GiaTu = res.GiaTu;
      this.sSearch.GiaDen = res.GiaDen;
      this.sSearch.DungLuong = res.DungLuong;
      this.sSearch.Ram = res.Ram;
      this.sSearch.HangSX = res.HangSX;
      this.sSearch.pageIndex = res.pageIndex;
      this.sSearch.pageSize = res.pageSize;

      // this.sSearch = res;
    });
    this.getLoaiSP();
    this.getHangSanXuat();
    this.getPage();
  }
  SearchTheoGia(tu, den) {
    this.sSearch.GiaTu = tu;
    this.sSearch.GiaDen = den;
    this.getPage();
  };
  SeachTheoRam(ram){
    this.sSearch.Ram = ram;
    this.getPage();
  }
  SearchTheoDungLuong(dungluong){
    this.sSearch.DungLuong = dungluong;
    this.getPage();
  }
  getPage() {
    this.route.navigate([], {
      queryParams: this.sSearch,
      queryParamsHandling: 'merge',
    });
    this.sp.showPageDanhMuc(this.sSearch).subscribe((res: any) => {
      this.dsSanPham = res.list;
      console.log(res);

      this.total = res.total;
    });
  }

  getPaginate(event){
    this.sSearch.pageIndex = event.pageIndex;
    this.sSearch.pageSize = event.pageSize;
    this.getPage();
  }
  BoLoc(loai){
    if (loai == 'ram') {
      this.sSearch.Ram = '';
    }
    if (loai == 'dungluong') {
      this.sSearch.DungLuong = '';
    }
    if (loai == 'gia') {
      this.sSearch.GiaTu = 0;
      this.sSearch.GiaDen = 0;

    }
    if (loai == 'tatca') {
      this.sSearch = {
        sSearch: '',
        pageIndex: 0,
        pageSize: 20,
        LoaiSP: '',
        HangSX: '',
        GiaTu: 0,
        GiaDen: 0,
        Ram:'',
        DungLuong:''
      };
    }

    this.getPage();
  }

  LocTheoHang(ma) {

    this.sSearch.HangSX = ma;
    this.getPage();
  }
  LocLoaiSP(loai) {
    this.route.navigate([], {
      queryParams: { LoaiSp: loai },
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
