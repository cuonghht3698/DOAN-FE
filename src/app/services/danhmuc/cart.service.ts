import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartModel } from 'src/app/components/khachhang/layout/detail/detail.component';
import { environment } from 'src/environments/environment';
import { QueryParams } from '../share/function';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient, private q: QueryParams) {}

  GetCartId(Id) {
    return this.http.get(environment.ApiUrl + 'carts/GetCartId/' + Id);
  }

  CheckCart(UserId) {
    return this.http.get(environment.ApiUrl + 'carts/CheckCart/' + UserId);
  }
  GetCartByUserId(id) {
    return this.http.get(environment.ApiUrl + 'carts/GetCartByUserId/' + id);
  }
  CreateNewCart(data: CartModel) {
    return this.http.post(environment.ApiUrl + 'carts/CreateNewCart', data);
  }
  ShowShoppingCart(id) {
    return this.http.get(environment.ApiUrl + 'carts/ShowShoppingCart/' + id);
  }
  ShowShoppingCartById(id) {
    return this.http.get(
      environment.ApiUrl + 'carts/ShowShoppingById?Id=' + id
    );
  }
  Update(data) {
    return this.http.post(environment.ApiUrl + 'carts/Update', data);
  }

  ChangTrangThai(data) {
    return this.http.post(environment.ApiUrl + 'carts/ChangTrangThai', data);
  }

  ShowPage(data) {
    return this.http.get(
      environment.ApiUrl +
        'carts/getpage?' +
        this.q.ConvertObjectToQueryString(data)
    );
  }
}
