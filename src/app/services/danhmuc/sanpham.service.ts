import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SanPhamService {
    constructor(private http: HttpClient) { }
    baseUri = environment.ApiUrl + 'sanphams/'
    GetPage(search) {
        return this.http.post(this.baseUri + 'getPage', search);
    }
    GetByName(search) {
        return this.http.get(this.baseUri + 'getByName',  search);
    }
    GetOptionById(Id) {
        return this.http.get(this.baseUri + 'getOptionById/' +  Id);
    }

    showPageDanhMuc(ma){
        return this.http.post(this.baseUri + 'showPageDanhMuc',  ma);
    }
    GetNhomMauOptionById(id){
        return this.http.get(this.baseUri + 'GetNhomMauOptionById/' +  id);
    }
    Create(data) {
        return this.http.post(this.baseUri, data);
    }
    GetByLoaiMa(ma){
        return this.http.get(this.baseUri + 'GetByLoaiMa',  ma);

    }
    Update(data) {
        return this.http.put(this.baseUri, data);
    }

    Delete(id) {
        return this.http.delete(this.baseUri + id)
    }

    FindByLoai(id) {
        return this.http.get(this.baseUri + 'FindByLoai?id=' + id)
    }
}