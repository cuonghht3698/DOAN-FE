import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurdService {

  constructor(private http : HttpClient) { }

  GetPage(url){
    return this.http.get(environment.ApiUrl+url);
  }

}
