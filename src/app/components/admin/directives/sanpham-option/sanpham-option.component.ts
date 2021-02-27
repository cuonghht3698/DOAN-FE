import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { optionservice } from 'src/app/services/danhmuc/optionSp.service';
import { SanPhamService } from 'src/app/services/danhmuc/sanpham.service';
import { GuidId } from 'src/app/services/ERole';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sanpham-option',
  templateUrl: './sanpham-option.component.html',
  styleUrls: ['./sanpham-option.component.css'],
})
export class SanphamOptionComponent implements OnInit {
  stateCtrl = new FormControl();
  filteredStates: Observable<any>;
  dsRam = [];
  dsRom = [];
  empty = GuidId.EmptyId;
  IdSanPham :GuidId.EmptyId;
  dsOption: any;
  dataThemSp = {
    Id: GuidId.EmptyId,
    Ten: '',
    ImageUrl: '',
    Ram: '',
    Rom: '',
    MoTa: '',
    ManHinh: '',
    Cpu: '',
    Pin: '',
  };
  dataOptionThem = {
    Id: GuidId.EmptyId,
    SanPhamId: GuidId.EmptyId,
    SoLuong: 1,
    Gia: 0,
    Rom: '',
    Ram: '',
    TrangThai: null,
    NgayTao: null,
    NgayHoanThanh: null,
  };
  checkSuaOption = false;
  dataOptionSp: any;
  dataNhanhMauSp: any;

  baseUrl = environment.ApiUrl + 'anh/get/';

  constructor(
    private sp: SanPhamService,
    private op: optionservice,
    private toastr: ToastrService
  ) {}

  @Input() demo: any;
  @Input() viewNhap: boolean;
  ngOnInit(): void {
    this.getProduct();
  }
  states = [];
  search = '';
  getProduct() {
    this.sp.GetByName({ search: this.search }).subscribe((res: any) => {
      this.states = res;
      this.filteredStates = this.stateCtrl.valueChanges.pipe(
        startWith(''),
        map((state) =>
          state ? this._filterStates(state) : this.states.slice()
        )
      );
    });
  }

  // get option by Id
  getOptionSp(id: any) {
    this.sp.GetOptionById(id).subscribe((res) => {
      this.dsOption = res;
    });
  }
  // GET NHÁNH MÀU OPTIOM
  // get option by Id
  getNhanhMauOption(id: any) {
    this.sp.GetNhomMauOptionById(id).subscribe((res) => {
      this.dataNhanhMauSp = res;
      console.log(res);
    });
  }
  private _filterStates(value: string) {
    const filterValue = value.toLowerCase();
    return this.states.filter(
      (state) => state.ten.toLowerCase().indexOf(filterValue) === 0
    );
  }
  ChoseSp(item) {
    this.getOptionSp(item.id);
    this.dataThemSp = {
      Id: item.id,
      ImageUrl: item.imageUrl,
      Ram: item.ram,
      Rom: item.rom,
      Ten: item.ten,
      MoTa: item.moTa.substring(0,1000) + ' ...',
      ManHinh: item.manHinh,
      Cpu: item.cpu,
      Pin: item.pin,
    };
    this.IdSanPham = item.id;
    this.dsRam = [];
    this.dsRom = [];

    const dataRam = String(item.ram).toUpperCase().trim().split('-');
    dataRam.forEach((element) => {
      this.dsRam.push({ ram: element });
    });
    const dataRom = String(item.rom).toUpperCase().trim().split('-');
    dataRom.forEach((element) => {
      this.dsRom.push({ rom: element });
    });
  }

  ChoseOption(item) {
    //this.checkSuaOption = true;
    // this.getNhanhMauOption(item.id);
    this.dataOptionThem = {
      Id: item.id,
      Gia: item.gia,
      NgayHoanThanh: item.ngayHoanThanh,
      NgayTao: item.ngayTao,
      Ram: item.ram,
      Rom: item.rom,
      SanPhamId: item.sanPhamId,
      SoLuong: item.soLuong,
      TrangThai: item.trangThai,
    };
    console.log(this.dataOptionThem);
  }
  HuyThemOption(){
    this.dataOptionThem = {
      Id: GuidId.EmptyId,
      SanPhamId: GuidId.EmptyId,
      SoLuong: 1,
      Gia: 0,
      Rom: '',
      Ram: '',
      TrangThai: null,
      NgayTao: null,
      NgayHoanThanh: null,
    };
  }
  ThemOption() {
    this.dataOptionThem.Id = GuidId.EmptyId;
    this.dataOptionThem.SanPhamId = this.IdSanPham;
    if (this.dataOptionThem.Gia== 0 || this.dataOptionThem.Rom == "" || this.dataOptionThem.Ram ==  "") {
      this.toastr.success("Thông tin không chính xác","Thông báo");

      return false;
    }
    this.op.Create(this.dataOptionThem).subscribe(
      (res) => {
        this.toastr.success("Thêm option thành công","Thông báo");
        this.getOptionSp(this.IdSanPham);
      },
      (err) => {
        this.toastr.error("Option này đã có trong hệ thống","Thông báo");
      }
    );
  }
  SuaOption() {
    this.op.Update(this.dataOptionThem).subscribe(
      (res) => {
        this.toastr.success("Sửa option thành công","Thông báo");
        this.getOptionSp(this.IdSanPham);
      },
      (err) => {
        this.toastr.error("Option này đã có trong hệ thống","Thông báo");
      }
    );
  }
  XoaOption() {}
}
