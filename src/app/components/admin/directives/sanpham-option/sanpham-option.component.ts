import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sanpham-option',
  templateUrl: './sanpham-option.component.html',
  styleUrls: ['./sanpham-option.component.css']
})
export class SanphamOptionComponent implements OnInit {

  constructor() { }
  @Input() demo: any;
  ngOnInit(): void {
  }

}
