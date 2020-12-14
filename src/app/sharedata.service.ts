import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SharedataService {
  constructor() { }
  private content = new BehaviorSubject<string>('');
  public share = this.content.asObservable();
  updateData(text) {
    this.content.next(text);
  }

  private contentncc = new BehaviorSubject<string>('');
  public sharencc = this.contentncc.asObservable();
  updateDatancc(text) {
    this.contentncc.next(text);
  }

  private suadanhmuc = new BehaviorSubject<string>('');
  public datasuadanhmuc = this.suadanhmuc.asObservable();

  UpdateDanhmuc(text) {
    this.suadanhmuc.next(text);
  }

  private suaCoso = new BehaviorSubject<string>('');
  public dataCoso = this.suaCoso.asObservable();

  UpdateCoso(text) {
    this.suaCoso.next(text);
  }

  private suaKho = new BehaviorSubject<string>('');
  public dataKho = this.suaKho.asObservable();

  UpdateKho(text) {
    this.suaKho.next(text);
  }


  private suaPhongBan = new BehaviorSubject<string>('');
  public dataPhongBan = this.suaPhongBan.asObservable();

  UpdatePB(text) {
    this.suaPhongBan.next(text);
  }

  private checkAuth = new BehaviorSubject<boolean>(false);
  public auth = this.checkAuth.asObservable();

  Auth(text) {
    this.checkAuth.next(text);
  }
}
