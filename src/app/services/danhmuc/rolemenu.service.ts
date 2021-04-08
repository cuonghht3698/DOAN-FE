import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RoleMenuService {
  constructor(private http: HttpClient) {}

  getRoleMenu(id: any) {
    return this.http.get(environment.ApiUrl + 'rolemenu/' + id);
  }
  getRoleUpdate(id: any) {
    return this.http.get(environment.ApiUrl + 'rolemenu/getRoleUpdate/' + id);
  }
  getMenuByNameRole(ten: string) {
    return this.http.get(environment.ApiUrl + 'findByTen/' + ten);
  }
  Create(data) {
    return this.http.post(environment.ApiUrl + 'rolemenu', data);
  }

  Update(data) {
    return this.http.put(environment.ApiUrl + 'rolemenu', data);
  }
  UpdateUuTien(Id, UuTien) {
    return this.http.get(environment.ApiUrl + 'rolemenu/UpdateUuTien', {
      params: { Id: Id, UuTien: UuTien },
    });
  }
  Delete(id, menuId, IdRole) {
    return this.http.delete(environment.ApiUrl + 'rolemenu', {
      params: { Id: id,MenuId:menuId, IdRole: IdRole },
    });
  }
}
