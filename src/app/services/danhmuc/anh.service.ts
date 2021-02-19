import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AnhService {
  constructor(private http: HttpClient) { }

  GetImageForId(id) {
    return this.http.get(environment.ApiUrl + 'anh/' + id);
  }

  PostAnh(file: FormData) {
    return this.http.post(environment.ApiUrl + 'anh', file, { reportProgress: true, observe: 'events' })
  }

  Create(data) {
    return this.http.post(environment.ApiUrl + 'anh/save', data);
  }

  //   Update(data) {
  //     return this.http.put(environment.ApiUrl + 'role', data);
  //   }

  //   Delete(id) {
  //     return this.http.delete(environment.ApiUrl + 'role/' + id);
  //   }

}
