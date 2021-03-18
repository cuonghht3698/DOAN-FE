import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartDetailModel, CartModel } from 'src/app/components/khachhang/layout/detail/detail.component';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CartDetailService {
  constructor(private http: HttpClient) {}


  CreateNewCartDetail(data: CartDetailModel) {
    return this.http.post(
      environment.ApiUrl + 'cartdetail/CreateNewCartDetail',
      data
    );
  }
  Delete(id){
    return this.http.delete(environment.ApiUrl + 'cartdetail/' +  id);
  }

  UpdateSL(id,sl:number){
    return this.http.get(environment.ApiUrl + 'cartdetail/UpdateSL?Id=' + id + "&SoLuong=" + sl );
  }



}
