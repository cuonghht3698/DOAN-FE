import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SearchModel } from 'src/app/models/search.model';
import { SanPhamService } from 'src/app/services/danhmuc/sanpham.service';

@Component({
  selector: 'app-thongsokythuat',
  templateUrl: './thongsokythuat.component.html',
  styleUrls: ['./thongsokythuat.component.css']
})
export class ThongsokythuatComponent implements OnInit {

  constructor(private sp: SanPhamService, private toarst: ToastrService) { }

  ngOnInit(): void {
    this.getSanPham();
  }
  search = {
    pageIndex: 0,
    pageSize: 10,
    sSearch: '',
    IdLoaiSanPham: null
  }
  dsThongSoMoi = [];

  dataThongSo = {
    Id: '',
    ThongSoKyThuat:''
  }
  dsSanPham:any ={
    list:[],
    total:0
  };
  getSanPham() {
    this.sp.getthongso(this.search).subscribe((res: any) => {
      this.dsSanPham = res;
      console.log(res);
      
    })
  }

  getPaginate(event) {
    this.search.pageIndex = event.pageIndex;
    this.search.pageSize = event.pageSize;
    this.getSanPham();
  }
  updateThongSo(){
    this.sp.updatethongso(this.dataThongSo).subscribe((res)=>{
      console.log(res);
      
    })
  }
}
