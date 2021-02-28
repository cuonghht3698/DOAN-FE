import { Component, OnInit } from '@angular/core';
import { MaTuDien } from 'src/app/services/constrans';
import { AnhService } from 'src/app/services/danhmuc/anh.service';
import { SanPhamService } from 'src/app/services/danhmuc/sanpham.service';
import { TudienService } from 'src/app/services/danhmuc/tudien.service';

@Component({
  selector: 'app-top-product',
  templateUrl: './top-product.component.html',
  styleUrls: ['./top-product.component.css'],
})
export class TopProductComponent implements OnInit {
  constructor(
    private anh: AnhService,
    private sp: SanPhamService,
    private tudien: TudienService
  ) {}
  dsMenu: any;
  ngOnInit(): void {
    this.getHangSX();
  }

  getSanPham() {
    this.sp.get
  }

  getHangSX() {
    this.tudien.getByLoai(MaTuDien.LoaiCauHinh).subscribe((res: any) => {
      this.dsMenu = res;
    });
  }
}
