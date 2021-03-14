import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TrangThaiGiaoDich } from 'src/app/services/constrans';
import { CartService } from 'src/app/services/danhmuc/cart.service';
import { CartDetailService } from 'src/app/services/danhmuc/cartdetail.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  constructor(
    private ct: CartService,
    private cd: CartDetailService,
    private toarst: ToastrService
  ) {}
  UserId = JSON.parse(localStorage.getItem('user'))[0].id;
  dataCartDetail: any;
  url = environment.ApiUrl + 'anh/get/';
  total = 0;
  ngOnInit(): void {
    this.getShoppingCart();
  }

  getShoppingCart() {
    this.ct.ShowShoppingCart(this.UserId).subscribe((res: any) => {
      console.log(res);
      this.dataCartDetail = res;
      if (res.length > 0) {
        this.total = 0;
        res.forEach((e) => {
          this.total += e.soLuong * e.gia;
        });
      }
    });
  }

  Delete(id) {
    this.cd.Delete(id).subscribe((res) => {
      this.toarst.success('Thông báo', 'Xóa thành công');
      this.getShoppingCart();
    });
  }
}
