import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.css'],
})
export class HoadonComponent implements OnInit {
  @Input() dsSanPham: string;
  constructor() {}

  ngOnInit(): void {}
}
