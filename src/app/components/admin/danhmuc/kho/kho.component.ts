import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { KhoService } from 'src/app/services/danhmuc/kho.service';

@Component({
  selector: 'app-kho',
  templateUrl: './kho.component.html',
  styleUrls: ['./kho.component.css'],
})
export class KhoComponent implements OnInit {
  constructor(private kho: KhoService, private toa: ToastrService) {}

  ngOnInit(): void {
    this.getPage();
  }
  search = {
    Search: '',
    PageIndex: 0,
    PageSize: 10,
  };

  dataKho = {
    Id: '',
    Ten: '',
    ChiNhanh: '',
    Active: true,
  };
  isEdit = false;
  total = 0;
  dsKho: any;
  getPage() {
    this.kho.GetPage(this.search).subscribe((res: any) => {
      this.dsKho = res.list;
      this.total = res.total;
      console.log(res);
    });
  }
  OpenDiaLog(item) {
    this.isEdit = true;
    if (item != null) {
      this.dataKho = {
        Id: item.id,
        Ten: item.ten,
        ChiNhanh: item.chiNhanh,
        Active: item.active,
      };
    }
  }
  CreateOrUpdate(isEdit) {
    if (!isEdit) {
      // thêm
      this.kho.Create(this.dataKho).subscribe((res) => {
        this.toa.success('Thông báo', 'Thêm thành công');
        this.getPage();
        this.isEdit = false;
      });
    } else {
      this.kho.Update(this.dataKho).subscribe((res) => {
        this.toa.success('Thông báo', 'Thêm thành công');
        this.isEdit = false;
        this.getPage();
      });
    }
  }
  getPaginate(event) {
    this.search.PageIndex = event.pageIndex;
    this.search.PageSize = event.pageSize;
    this.getPage();
  }
}
