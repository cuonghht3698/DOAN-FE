import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { CartService } from 'src/app/services/danhmuc/cart.service';

@Component({
  selector: 'app-lichsumuahang',
  templateUrl: './lichsumuahang.component.html',
  styleUrls: ['./lichsumuahang.component.css'],
})
export class LichsumuahangComponent implements OnInit {
  dataSource = [];

  constructor(private cart: CartService, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    var user = this.auth.getUserLocal();
    if (user) {
      this.cart.GetCartByUserId(user.id).subscribe((res: any) => {
        this.dataSource = res;

      });
    }
  }
  XeChiTiet(id){

  }
}
