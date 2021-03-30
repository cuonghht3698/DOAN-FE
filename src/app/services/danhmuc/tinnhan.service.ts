import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TinNhanService {
  baseUri = environment.ApiUrl + 'tinnhans/';
  constructor(private http: HttpClient) { }



  CreateOrGet(UserId) {
    return this.http.get(this.baseUri + "CreateOrGet/" + UserId);
  }


}
