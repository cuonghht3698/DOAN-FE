import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.css'],
})
export class HoadonComponent implements OnInit {
  @Input() data: any;
  @Input() tenNV: string;

  constructor() {}
  ngay: any;
  thang: any;
  nam: any;

  ngOnInit(): void {
    this.ngay = moment().format('DD');
    this.thang = moment().format('MM');
    this.nam = moment().format('yyyy');

  }
}
