import { GuidId } from './../ERole';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class KhoService {
  baseApi = environment.ApiUrl + 'khos/';
  constructor(private http : HttpClient) { }
  GetPage(search){
    return this.http.post(this.baseApi +'getPage', search);
  }


  Create(data){
    data.Id = GuidId.EmptyId;
    return this.http.post(this.baseApi, data);
  }

  Update(data){
    return this.http.put(this.baseApi, data);
  }

  Delete(id){
    return this.http.delete(this.baseApi +id);
  }

}
