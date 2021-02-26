import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SanPhamService } from 'src/app/services/danhmuc/sanpham.service';

@Component({
  selector: 'app-sanpham-option',
  templateUrl: './sanpham-option.component.html',
  styleUrls: ['./sanpham-option.component.css']
})
export class SanphamOptionComponent implements OnInit {
  stateCtrl = new FormControl();
  filteredStates: Observable<any>;
  constructor(private sp: SanPhamService) {
    
  }
  private _filterStates(value: string): any{
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }
  @Input() demo: any;
  @Input() viewNhap: boolean;
  ngOnInit(): void {
    this.getProduct();
  }
  states: any;
  Search = {
    sSearch:'',
    pageIndex:1,
    pageSize : 10
  }
  getProduct(){
    this.sp.GetPage(this.Search).subscribe((res: any)=>{
      this.states = res.List;
      console.log(res);
      this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
    })
  }
}
