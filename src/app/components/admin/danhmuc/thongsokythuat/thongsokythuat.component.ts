import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SearchModel } from 'src/app/models/search.model';
import { LoaiGiaoDich } from 'src/app/services/constrans';
import { SanPhamService } from 'src/app/services/danhmuc/sanpham.service';

@Component({
  selector: 'app-thongsokythuat',
  templateUrl: './thongsokythuat.component.html',
  styleUrls: ['./thongsokythuat.component.css'],
})
export class ThongsokythuatComponent implements OnInit {
  constructor(private sp: SanPhamService, private toarst: ToastrService) {}
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @HostListener('window:beforeunload', ['$event'])
  doSomething($event) {
    if (this.isChange) $event.returnValue = 'Your data will be lost!';
  }
  ngOnInit(): void {
    this.getSanPham();
  }
  search = {
    pageIndex: 0,
    pageSize: 10,
    sSearch: '',
    IdLoaiSanPham: null,
  };
  dsThongSoMoi = [];
  isChange = false;
  dataThongSo = {
    Id: '',
    ThongSoKyThuat: '',
  };
  dsSanPham: any = {
    list: [],
    total: 0,
  };
  TenSp = '';
  getSanPham() {
    this.sp.getthongso(this.search).subscribe((res: any) => {
      this.dsSanPham = res;
    });
  }
  ChonSanPham(item) {
    this.TenSp = item.ten;
    this.scrollToBottom();
    if (this.isChange) {
      var r = confirm('Bạn có muốn lưu!');
      if (r == true) {
        this.LuuThongSo();
      }
    }
    this.dataThongSo = {
      Id: item.id,
      ThongSoKyThuat: '',
    };
    if (item.thongSoKyThuat == '{}') {
      item.thongSoKyThuat = null;
    }
    this.dsThongSoMoi = [];
    if (item.thongSoKyThuat) {
      this.dsThongSoMoi = Object.entries(JSON.parse(item.thongSoKyThuat));
    } else {
      this.dsThongSoMoi.push(['', '']);
    }
  }
  GetMau(item){
    if (item.thongSoKyThuat == '{}') {
      item.thongSoKyThuat = null;
    }
    this.dsThongSoMoi = [];
    if (item.thongSoKyThuat) {
      this.dsThongSoMoi = Object.entries(JSON.parse(item.thongSoKyThuat));
    } else {
      this.dsThongSoMoi.push(['', '']);
    }
  }
  getPaginate(event) {
    this.search.pageIndex = event.pageIndex;
    this.search.pageSize = event.pageSize;
    this.getSanPham();
  }
  // updateThongSo(){
  //   this.sp.updatethongso(this.dataThongSo).subscribe((res)=>{
  //     this.isChange = false;
  //   });

  // }

  ThemRows() {
    this.dsThongSoMoi.push(['', '']);
    this.scrollToBottom();
  }
  Remove(i) {
    this.isChange = true;
    this.dsThongSoMoi.splice(i, 1);
  }
  SpliceThongSo(index, New, target) {
    this.isChange = true;
    if (target == 'key') {
      this.dsThongSoMoi.splice(index, 1, [New, this.dsThongSoMoi[index][1]]);
    }
    if (target == 'value') {
      this.dsThongSoMoi.splice(index, 1, [this.dsThongSoMoi[index][0], New]);
    }
  }
  LuuThongSo() {
    var obj = Object.assign(
      {},
      ...this.dsThongSoMoi.map((p) => ({ [p[0]]: p[1] }))
    );
    this.dataThongSo.ThongSoKyThuat = JSON.stringify(obj);
    this.sp.updatethongso(this.dataThongSo).subscribe((res) => {
      this.toarst.success('Thao tác thành công', 'Thông báo!');
      this.isChange = false;
      this.getSanPham();
    });
  }

  scrollToBottom(): void {
    try {
      const el: HTMLDivElement = this.myScrollContainer.nativeElement;
      el.scrollTop = Math.max(0, el.scrollHeight - el.offsetHeight);
    } catch (err) {}
  }
}
