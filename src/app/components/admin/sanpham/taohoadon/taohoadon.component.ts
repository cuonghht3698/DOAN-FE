import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CartModel } from 'src/app/components/khachhang/layout/detail/detail.component';
import { LoaiGiaoDich, TrangThaiGiaoDich } from 'src/app/services/constrans';
import { CartService } from 'src/app/services/danhmuc/cart.service';
import { CartDetailService } from 'src/app/services/danhmuc/cartdetail.service';
import { EmailService } from 'src/app/services/danhmuc/email.service';
import { SanPhamService } from 'src/app/services/danhmuc/sanpham.service';
import { TudienService } from 'src/app/services/danhmuc/tudien.service';
import { GuidId } from 'src/app/services/ERole';
import { DataService } from 'src/app/services/share/data.share';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-taohoadon',
  templateUrl: './taohoadon.component.html',
  styleUrls: ['./taohoadon.component.css'],
})
export class TaohoadonComponent implements OnInit {
  constructor(
    private ct: CartService,
    private cd: CartDetailService,
    private toarst: ToastrService,
    private routerA: ActivatedRoute,
    private email: EmailService,
    public upCart: DataService,
    private cookieService: CookieService,
    private sp: SanPhamService,
    private cm: TudienService
  ) {}
  stateCtrl = new FormControl();
  filteredStates: Observable<any>;
  ngOnInit(): void {
    this.getLoai();
    this.getProduct();
  }
  url = environment.ApiUrl + 'anh/get/';
  tenNV = JSON.parse(localStorage.getItem('user'))[0].hoTen;
  dataThemSp = {
    Id: GuidId.EmptyId,
    Ten: '',
    ImageUrl: '',
    Ram: '',
    Rom: '',
    ManHinh: '',
    Cpu: '',
    Pin: '',
    Gia: 0,
  };

  dataCart = {
    NhanVienId: JSON.parse(localStorage.getItem('user'))[0].id,
    DiaChi: '',
    TongTien: 0,
    Sdt: '',
    Email: '',
    HoTen: '',
    DSSanPham: [],
  };
  dataOption = {
    gia: 0,
    tenSanPham: '',
    optionId: GuidId.EmptyId,
    sanPhamId: GuidId.EmptyId,
    soLuong: 1,
    ram: '',
    rom: '',
  };

  ChoseSp(item) {
    this.getOptionSp(item.id);
    this.dataThemSp = {
      Id: item.id,
      ImageUrl: item.imageUrl,
      Ram: item.ram,
      Rom: item.rom,
      Ten: item.ten,
      ManHinh: item.manHinh,
      Cpu: item.cpu,
      Pin: item.pin,
      Gia: item.gia,
    };
  }
  ChoseOption(item) {
    this.dataOption = {
      tenSanPham: this.dataThemSp.Ten,
      gia: item.gia,
      optionId: item.id,
      sanPhamId: item.sanPhamId,
      soLuong: 1,
      ram: item.ram,
      rom: item.rom,
    };
    this.dataCart.DSSanPham.push(this.dataOption);
    this.dataCart.TongTien = 0;
    this.dataCart.DSSanPham.forEach((e) => {
      this.dataCart.TongTien += e.gia * e.soLuong;
    });
  }
  dsOption: any;
  IsDaHoanThanh = false;


  TaoMoi() {
    location.reload();
    this.IsDaHoanThanh = false;
  }
  // get option by Id
  getOptionSp(id: any) {
    this.sp.GetOptionById(id).subscribe((res) => {
      this.dsOption = res;
      console.log(res);
    });
  }
  dsLoai: any;
  dsHang: any;
  IdHang = '';
  IdLoai = '';
  getLoai() {
    this.cm.getByLoai('HangSanXuat').subscribe((res) => {
      this.dsHang = res;
    });
    this.cm.getByLoai('LoaiSanPham').subscribe((res) => {
      this.dsLoai = res;
    });
  }
  ChangeSoLuong(index, value) {
    this.dataCart.DSSanPham[index].soLuong = value;
    this.dataCart.TongTien = 0;
    this.dataCart.DSSanPham.forEach((e) => {
      this.dataCart.TongTien += e.gia * e.soLuong;
    });
  }

  Xoa(index) {
    this.dataCart.DSSanPham.splice(index, 1);
  }

  SaveHoaDon(IsPrint) {
    this.ct.TaoHoaDon(this.dataCart).subscribe(
      (res) => {
        this.toarst.success('Tạo hóa đơn thành công ', 'Thông báo');
        this.IsDaHoanThanh = true;
        if (IsPrint) {
          this.Print();
        }
      },
      (err) => {
        this.toarst.error('Kiểm tra lại thông tin', 'Thông báo');
      }
    );
  }

  In() {
    window.print();
  }

  states = [];
  search = '';
  getProduct() {
    this.sp
      .GetByName(this.search, this.IdLoai, this.IdHang)
      .subscribe((res: any) => {
        this.states = res;
        this.filteredStates = this.stateCtrl.valueChanges.pipe(
          startWith(''),
          map((state) =>
            state ? this._filterStates(state) : this.states.slice()
          )
        );
      });
  }
  private _filterStates(value: string) {
    const filterValue = value.toLowerCase();
    return this.states.filter(
      (state) => state.ten.toLowerCase().indexOf(filterValue) === 0
    );
  }

  Print() {
    const printContent = document.getElementById('print');
    const WindowPrt = window.open('', '');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }
}
