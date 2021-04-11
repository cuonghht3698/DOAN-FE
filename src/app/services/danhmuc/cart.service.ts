import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartModel } from 'src/app/components/khachhang/layout/detail/detail.component';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CartService {
  constructor(private http: HttpClient) {}

  GetCartId(Id) {
    return this.http.get(environment.ApiUrl + 'carts/GetCartId/' + Id);
  }

  CheckCart(UserId, ClientId) {
    return this.http.get(environment.ApiUrl + 'carts/CheckCart', {
      params: { UserId: UserId, ClientId: ClientId },
    });
  }
  GetCartByUserId(id) {
    return this.http.get(environment.ApiUrl + 'carts/GetCartByUserId/' + id);
  }
  CreateNewCart(data: CartModel) {
    return this.http.post(environment.ApiUrl + 'carts/CreateNewCart', data);
  }
  ShowShoppingCart(id, ClientId) {
    return this.http.get(environment.ApiUrl + 'carts/ShowShoppingCart', {
      params: { UserId: id, ClientId: ClientId },
    });
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
    return this.http.post(environment.ApiUrl + 'carts/getpage', data);
  }

  DatHang(data) {
    return this.http.post(environment.ApiUrl + 'carts/GiaoHang', data);
  }
  HuyDon(data) {
    return this.http.post(environment.ApiUrl + 'carts/HuyDon', data);
  }
  HoanThanh(data) {
    return this.http.post(environment.ApiUrl + 'carts/HoanThanh', data);
  }
}
