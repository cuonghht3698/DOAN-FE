import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface State {
  flag: string;
  name: string;
  population: string;
}
@Component({
  selector: 'app-sanpham-option',
  templateUrl: './sanpham-option.component.html',
  styleUrls: ['./sanpham-option.component.css']
})
export class SanphamOptionComponent implements OnInit {
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }
  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }
  @Input() demo: any;
  @Input() viewNhap: boolean;
  ngOnInit(): void {
  }
  states: State[] = [
    {
      name: '218312837123123',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    }
  ];
}
