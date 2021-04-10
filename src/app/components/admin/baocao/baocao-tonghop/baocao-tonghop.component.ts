import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { BaoCaoService } from 'src/app/services/danhmuc/baocao.service';
import { KhoService } from 'src/app/services/danhmuc/kho.service';

@Component({
  selector: 'app-baocao-tonghop',
  templateUrl: './baocao-tonghop.component.html',
  styleUrls: ['./baocao-tonghop.component.css']
})
export class BaocaoTonghopComponent implements OnInit {

  constructor(private baocao: BaoCaoService) { }

  ngOnInit(): void {
    this.getBaoCaoTheoThang();
  }
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Tổng' },
  ];
  ParamsBaoCaoTheoThang = {
    Nam :2021
  }
  //dataBaoCaoTheoThang:any;
  getBaoCaoTheoThang(){
    this.baocao.BaoCaoTheoThang(this.ParamsBaoCaoTheoThang).subscribe((res:any)=>{
      //this.dataBaoCaoTheoThang = res;
      console.log(res);
      this.barChartLabels = [];
      this.barChartData[0].data = [];

      res.forEach(item => {
        this.barChartLabels.push(item.thang);
        this.barChartData[0].data.push(item.tong);
      });



    });
  }
}
