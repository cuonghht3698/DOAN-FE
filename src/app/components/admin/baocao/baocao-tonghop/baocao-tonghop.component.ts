import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
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
    this.TongHopTrangThaiDonHang();
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
  // Báo cáo theo tháng
  getBaoCaoTheoThang(){
    this.baocao.BaoCaoTheoThang(this.ParamsBaoCaoTheoThang).subscribe((res:any)=>{
      //this.dataBaoCaoTheoThang = res;
      this.barChartLabels = [];
      this.barChartData[0].data = [];

      res.forEach(item => {
        this.barChartLabels.push(item.thang);
        this.barChartData[0].data.push(item.tong);
      });
    });
  }


  //báo cáo trang thái
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  TongHopTrangThaiDonHang(){
    this.baocao.TongHopTrangThaiDonHang(this.ParamsBaoCaoTheoThang).subscribe((res:any)=>{
      //this.dataBaoCaoTheoThang = res;
      this.pieChartData = [];
      this.pieChartLabels = [];
      res.forEach(item => {
        this.pieChartData.push(item.soLuong);
        this.pieChartLabels.push(item.trangThai);

      });
    });
  }


}
