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


    Create(data) {
        return this.http.post(this.baseUri, data);
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