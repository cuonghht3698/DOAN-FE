import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaiGiaoDich, TrangThaiGiaoDich } from 'src/app/services/constrans';
import { BlogService } from 'src/app/services/danhmuc/blog.service';
import { CartService } from 'src/app/services/danhmuc/cart.service';
import { CartDetailService } from 'src/app/services/danhmuc/cartdetail.service';
import { optionservice } from 'src/app/services/danhmuc/optionSp.service';
import { GuidId } from 'src/app/services/ERole';
import { DataService } from 'src/app/services/share/data.share';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(
    private op: optionservice,
    private router: ActivatedRoute,
    private r: Router,
    private cart: CartService,
    private cartDetail: CartDetailService,
    private toar: ToastrService,
    public upCart:DataService,
    private blog:BlogService,
    private sanitized: DomSanitizer
  ) {}
  IdSp = GuidId.EmptyId;
  SanPham: any;
  currentOption: string;
  HetHang = false;
  SoLuongKho = 0;
  DataCart: CartModel = {
    Id: GuidId.EmptyId,
    TinNhan: '',
    ThoiGianTao: new Date(),
    LoaiGiaoDich: LoaiGiaoDich.MuaHang,
    UserId: GuidId.EmptyId,
    TrangThai: TrangThaiGiaoDich.DangGiaoDich,
    NhanVienId: null,
    DiaChi: '',
    TongTien: 0,
    NgayHoanThanh:null,
    Sdt: '',
    Email:'',
    HoTen:''
  };
  DataCartDetail: CartDetailModel = {
    Id: GuidId.EmptyId,
    Gia: 0,
    Mau: '',
    CartId: GuidId.EmptyId,
    OptionId: GuidId.EmptyId,
    SanPhamId: GuidId.EmptyId,
    SoLuong: 1,
    ThoiGianTao: new Date(),
    UuTien: 0,
  };
  dsThongSo = [];
  url = environment.ApiUrl + 'anh/get/';
  ngOnInit(): void {
    this.router.queryParams.subscribe((res) => {
      this.IdSp = res.id;
      this.GetBlog(res.id);
    });
    this.getSanPham();
    if (JSON.parse(localStorage.getItem('user'))) {
      this.DataCart.UserId = JSON.parse(localStorage.getItem('user'))[0].id;
      this.DataCart.Sdt = JSON.parse(localStorage.getItem('user'))[0].sdt,
      this.CheckCart();
    }
  }
  // cHECK CART
  // Kieemr tra cart co san sang k trang thai giao dich = dang giao dich
  CheckCart() {
    this.cart.CheckCart(this.DataCart.UserId).subscribe((res: any) => {
      // CHECK CO CART NAO K
      if (res[0]?.id) {
        this.DataCart.Id = res[0].id;
        this.DataCartDetail.CartId = res[0].id;
      }
      // Tao cart mới
      else {
        this.cart.CreateNewCart(this.DataCart).subscribe((res:any) => {
          this.DataCart.Id = res.id;
          this.DataCartDetail.CartId = res.id;
        });
      }
    });
  }

  AddToCart() {
    this.cartDetail
      .CreateNewCartDetail(this.DataCartDetail)
      .subscribe((res) => {
        this.toar.success('Thông báo', 'Thêm vào giỏ hàng thành công!');
        this.upCart.update(1);
      });
  }

  // END CHECK CART
  getSanPham() {
    this.op.GetOptionByIdSp(this.IdSp).subscribe((res: any) => {
      this.SanPham = res;
      console.log(res);

      if (res[0].thongSoKyThuat) {
        this.dsThongSo = Object.entries(JSON.parse(res[0].thongSoKyThuat))
      }

      if (res.length > 0) {
        this.DataCartDetail.SanPhamId = res[0].sanPhamId;
        this.DataCartDetail.SoLuong = 1;
        this.DataCartDetail.SanPhamId = this.IdSp;
        if (res[0].option.length > 0) {
          this.DataCartDetail.OptionId = res[0].option[0].id;
          this.DataCartDetail.Gia = res[0].option[0].gia;
          this.SoLuongKho = res[0].option[0].soLuong;
          this.currentOption =
            res[0].option[0].ram + ' - ' + res[0].option[0].rom;
        }
      } else {
        this.HetHang = true;
      }
    });
  }

  DatHang(){

  }
  noiDung:SafeHtml;
  DataBlog:any = {
    noiDung:''
  }
  GetBlog(Id){
    this.blog.getByIdSanPham(Id).subscribe((res:any)=>{
      console.log(res);
      if (res) {
        this.noiDung = this.sanitized.bypassSecurityTrustHtml(res.noiDung);
        this.DataBlog = res;

      }else{
        this.DataBlog.noiDung = "<h1>Hiện tại chưa có bài viết nào về sản phẩm này!</h1>";

      }

    });
  }

  GoToDetail(item) {
    this.r.navigateByUrl('shop/chitiet/' + item.id);
  }
  ChonOption(a) {
    if (a.soLuong == 0) {
      return;
    }
    this.DataCartDetail.OptionId = a.id;
    this.DataCartDetail.SanPhamId = a.sanPhamId;
    this.DataCartDetail.Gia = a.gia;
    this.SoLuongKho = a.soLuong;
    this.currentOption = a.ram + ' - ' + a.rom;
  }
}

export interface CartDetailModel {
  Id: GuidId.EmptyId;
  CartId: GuidId.EmptyId;
  SoLuong: number;
  ThoiGianTao: Date;
  SanPhamId: GuidId.EmptyId;
  OptionId: GuidId.EmptyId;
  Gia: Number;
  Mau: string;
  UuTien: number;
}
export interface CartModel {
  Id: GuidId.EmptyId;
  TinNhan: string;
  ThoiGianTao: Date;
  LoaiGiaoDich: string;
  UserId: GuidId.EmptyId;
  TrangThai: string;
  NhanVienId: string;
  DiaChi: string;
  TongTien: number;
  Sdt:string;
  NgayHoanThanh:Date;
  HoTen:string;
  Email:string;
}
