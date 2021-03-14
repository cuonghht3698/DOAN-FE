import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartModel } from 'src/app/components/khachhang/layout/detail/detail.component';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) { }

  CheckCart(UserId) {
    return this.http.get(environment.ApiUrl + 'carts/CheckCart/' + UserId);
  }
  GetCartByUserId(id) {
    return this.http.get(environment.ApiUrl + 'carts/GetCartByUserId/' + id);
  }
  CreateNewCart(data:CartModel){
    return this.http.post(environment.ApiUrl + 'carts/CreateNewCart',data);
  }
  ShowShoppingCart(id) {
    return this.http.get(environment.ApiUrl + 'carts/ShowShoppingCart/' +  id);
  }

}
