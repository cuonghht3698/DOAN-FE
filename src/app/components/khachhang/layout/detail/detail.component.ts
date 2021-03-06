import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { optionservice } from 'src/app/services/danhmuc/optionSp.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(private op: optionservice, private router: ActivatedRoute) {}
  IdSp: string = '';
  SanPham:any;

  AddOption = {
    Id : '',
    IdSanPham :'',
    SoLuong: 1,
    Gia:0
  }
  url = environment.ApiUrl + "anh/get/"
  ngOnInit(): void {
    this.router.params.subscribe((res) => {
      this.IdSp = res.id;
    });
    this.getSanPham();
  }
  getSanPham() {
    this.op.GetOptionByIdSp(this.IdSp).subscribe((res: any) => {
      this.SanPham = res;
      console.log(res);
    });
  }

  ChonOption(a){
    console.log(a);
    
  }
}
