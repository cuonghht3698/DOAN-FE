import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SanPhamService } from 'src/app/services/danhmuc/sanpham.service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { environment } from 'src/environments/environment';
import { TudienService } from 'src/app/services/danhmuc/tudien.service';
@Component({
  selector: 'app-danhmuc',
  templateUrl: './danhmuc.component.html',
  styleUrls: ['./danhmuc.component.css'],
})
export class DanhmucComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private sp: SanPhamService,
    private td: TudienService
  ) {}
  sSearch = {
    search: '',
    pageIndex: 0,
    pageSize: 20,
    Ma: '',
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
  total: number = 0;
  url = environment.ApiUrl + 'anh/get/';
  ngOnInit(): void {
    this.router.params.subscribe((res) => {
      if (res) {
        this.sSearch.Ma = res.ma;
      }
    });
    this.getLoaiSP();
    this.getPage();
  }

  getPage() {
    this.sp.showPageDanhMuc(this.sSearch).subscribe((res: any) => {
      this.dsSanPham = res.list;
      this.total = res.total;
    });
  }

  getLoaiSP() {
    this.td.getByLoai("LoaiCauHinh").subscribe((res:any)=>{
      
      this.dsLoaiSP = res;
      console.log(res);
      
    })
  }
}
