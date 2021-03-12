import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartDetailModel, CartModel } from 'src/app/components/khachhang/layout/detail/detail.component';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CartDetailService {
  constructor(private http: HttpClient) {}

  GetCartDetailById(id) {
    return this.http.get(environment.ApiUrl + 'carts/GetCartByUserId/' + id);
  }
  CreateNewCartDetail(data: CartDetailModel) {
    return this.http.post(
      environment.ApiUrl + 'cartdetail/CreateNewCartDetail',
      data
    );
  }
}
