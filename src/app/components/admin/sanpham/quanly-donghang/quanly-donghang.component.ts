import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { CartService } from 'src/app/services/danhmuc/cart.service';

@Component({
  selector: 'app-quanly-donghang',
  templateUrl: './quanly-donghang.component.html',
  styleUrls: ['./quanly-donghang.component.css'],
})
export class QuanlyDonghangComponent implements OnInit {
  dataSource = [];
  constructor(private cart: CartService, private auth: AuthenticationService) {}
  sSearch = {
    Search: '',
    PageIndex: 0,
    PageSize: 10,
  };
  ngOnInit(): void {
    this.getCart();
  }
  getCart() {
    var user = this.auth.getUserLocal();
    if (user) {
      this.cart.ShowPage(this.sSearch).subscribe((res: any) => {
        console.log(res);
        
        this.dataSource = res;
      });
    }
  }
}
