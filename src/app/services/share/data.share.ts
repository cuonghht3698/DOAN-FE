import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class DataService {

  private CountCart : number = 0;

  update() {
    this.CountCart++;
  }

  get selectedValue(){
    return this.CountCart
  }
  Value(v){
     this.CountCart = v;
  }
}
