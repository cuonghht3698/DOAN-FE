import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SanPhamService } from 'src/app/services/danhmuc/sanpham.service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
@Component({
  selector: 'app-danhmuc',
  templateUrl: './danhmuc.component.html',
  styleUrls: ['./danhmuc.component.css'],
})
export class DanhmucComponent implements OnInit {
  constructor(private router: ActivatedRoute, private sp: SanPhamService) {}
  sSearch = {
    search: '',
    pageIndex: 0,
    pageSize: 20,
    loaiSanPham: '',
  };
  slides = [
    { image: '/assets/img/h4-slide.png' },
    { image: '/assets/img/h4-slide2.png' },
    { image: '/assets/img/h4-slide3.png' },
    { image: '/assets/img/h4-slide4.png' },
    { image: '/assets/img/h4-slide7.png' },
  ];
  dsSanPham = [];
  ngOnInit(): void {
    this.router.params.subscribe((res) => {
      if (res) {
        this.sSearch.loaiSanPham = res.ma;
      }
    });
    this.getPage();
  }

  getPage() {
    this.sp.showPageDanhMuc(this.sSearch).subscribe((res: any) => {
      this.dsSanPham = res;
    });
  }
}
