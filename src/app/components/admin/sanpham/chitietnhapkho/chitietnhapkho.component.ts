import { Component, OnInit } from '@angular/core';
import { SanPhamService } from 'src/app/services/danhmuc/sanpham.service';

@Component({
  selector: 'app-chitietnhapkho',
  templateUrl: './chitietnhapkho.component.html',
  styleUrls: ['./chitietnhapkho.component.css'],
})
export class ChitietnhapkhoComponent implements OnInit {
  constructor(private sp: SanPhamService) {}

  ngOnInit(): void {}
  search = {
    Ten :'',
    LoaiSpid: null,
    HangSxid: null
  }
  dsSanPham :any;
  getSanPham(){
    this.sp.GetNhapByTenLoaiHang(this.search).subscribe((res)=>{
      this.dsSanPham = res;
    })
  }
}
