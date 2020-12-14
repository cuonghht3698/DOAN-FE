import { GuidId } from './../ERole';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoaitudienService {
  baseUri = 'loaitudien';
  constructor(private http : HttpClient) { }
  GetPage(search){
    return this.http.post(environment.ApiUrl + this.baseUri +'/getPage', search);
  }
  GetAll(){
    return this.http.get(environment.ApiUrl + this.baseUri + '/getAll');
  }

  Create(data){
    data.Id = GuidId.EmptyId;
    return this.http.post(environment.ApiUrl+this.baseUri,data);
  }

  Update(data){
    return this.http.put(environment.ApiUrl+this.baseUri,data);
  }

  Delete(id){
    return this.http.delete(environment.ApiUrl+this.baseUri+ '/' +id)
  }
}
