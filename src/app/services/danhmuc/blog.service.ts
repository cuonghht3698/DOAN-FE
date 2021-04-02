import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class BlogService {
    baseUri = environment.ApiUrl + 'blogs/';
    constructor(private http: HttpClient) { }



    GetPage(data) {
        return this.http.post(this.baseUri + "getPage", data );
    }
    
    getById(Id) {
        return this.http.get(this.baseUri + 'getById', {params: {Id : Id}});
    }
    Create(data) {
        return this.http.post(this.baseUri , data);
    }

    Update(data) {
        return this.http.put(this.baseUri, data);
    }

    Delete(id) {
        return this.http.delete(this.baseUri + id)
    }
}
