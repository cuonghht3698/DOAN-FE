import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BaoCaoService {
  baseUri = environment.ApiUrl + 'baocaos/';
  constructor(private http: HttpClient) {}
  BaoCaoTheoThang(data) {
    return this.http.post(this.baseUri + 'BaoCaoTheoThang', data);
  }

  TongHopTrangThaiDonHang(data) {
    return this.http.post(this.baseUri + 'TongHopTrangThaiDonHang', data);
  }
  bao_cao_theo_nhan_vien(data) {
    return this.http.post(this.baseUri + 'Baocaotheonhanvien', data);
  }
}
