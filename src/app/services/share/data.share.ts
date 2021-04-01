import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class DataService {

  private CountCart : number = 0;

  update(i) {
    this.CountCart += i;
  }

  resest(){
    this.CountCart = 0;
  }
  get selectedValue(){
    return this.CountCart
  }
  Value(v){
     this.CountCart = v;
  }
}
