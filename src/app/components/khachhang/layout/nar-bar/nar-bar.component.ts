import { Component, OnInit } from '@angular/core';
import { MaTuDien } from 'src/app/services/constrans';
import { TudienService } from 'src/app/services/danhmuc/tudien.service';
import { GuidId } from 'src/app/services/ERole';

@Component({
  selector: 'app-nar-bar',
  templateUrl: './nar-bar.component.html',
  styleUrls: ['./nar-bar.component.css'],
})
export class NarBarComponent implements OnInit {
  constructor(private tudien: TudienService) {}
  dsMenu: any;
  ngOnInit(): void {
    this.getMenu();
  }

  getMenu() {
    this.tudien.getByLoai(MaTuDien.LoaiCauHinh).subscribe((res:any) => {
      this.dsMenu = res;
    });
  }
}
