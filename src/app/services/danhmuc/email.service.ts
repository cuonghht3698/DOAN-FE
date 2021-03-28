
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  baseUri = environment.ApiUrl + 'emails';
  constructor(private http: HttpClient) { }


 SentEmail(data){
  return this.http.post(this.baseUri,data).toPromise();
 }
}
