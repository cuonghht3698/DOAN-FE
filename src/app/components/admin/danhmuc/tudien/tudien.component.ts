import { LoaitudienService } from 'src/app/services/danhmuc/loaitudien.service';
import { TudienService } from './../../../../services/danhmuc/tudien.service';
import { ToastrService } from 'ngx-toastr';
import { GuidId } from './../../../../services/ERole';
import { LoaiTuDien } from './../../../../models/loaitudien.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PopTuDien, TuDien } from './popup/tudien.popup';

@Component({
  selector: 'app-tudien',
  templateUrl: './tudien.component.html',
  styleUrls: ['./tudien.component.css'],
})
export class TudienComponent implements OnInit {
  displayedColumns: string[] = [
    'stt',
    'ma',
    'tenloai',
    'tenngan',
    'ten',
    'ghichu',
    'uutien',
    'active',
    'action',
  ];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  IdNull = GuidId.EmptyId;
  TotalItem: number;
  dataTuDien: FormGroup;
  dataRes: Array<LoaiTuDien>;
  dsLoaiTuDien:object[];
  dataSelect:TuDien;
  constructor(
    private tudien: TudienService,
    private fb: FormBuilder,
    private toarst: ToastrService,
    private diaLog: MatDialog,
    private loaitudien:LoaitudienService
  ) {}
  // DATA SEARCH
  search = {
    sSearch: '',
    LoaiTuDienId : GuidId.EmptyId,
    pageIndex: 1,
    pageSize: 10,
  };

  ngOnInit(): void {
    this.getPage();
    this.getLoaiTuDien();
    this.dataTuDien = this.fb.group({
      Id: this.IdNull,
      MaLoai: '',
      Ten: '',
    });
  }

  openDialog(item){
    const dialog = this.diaLog.open(PopTuDien, {
      width:'60%',
      height:'500px',
      data:{ob:item},
      disableClose :true,
    });

    dialog.afterClosed().subscribe(res=>{
      this.dataTuDien = res;
      console.log(res);
      this.getPage();
    })
  }

  // CHANGE PAGE INDEX OR PAGE SIZE
  getPaginate(event) {
    this.search.pageIndex = event.pageIndex;
    this.search.pageSize = event.pageSize;
    this.getPage();
  }
      //GET LOAI TU DIEN
      getLoaiTuDien(){
        this.loaitudien.GetAll().subscribe((res:any)=>{
          this.dsLoaiTuDien = res;
        });
      }
  // GET PAGE LOAI TU DIEN
  getPage() {
    this.tudien.GetPage(this.search).subscribe(
      (res: any) => {
        console.log(res);

        const ELEMENT_DATA = res.list;
        this.TotalItem = res.total;
        this.dataSource = ELEMENT_DATA;
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  SelectRow(item) {
    this.dataTuDien = this.fb.group({
      Id: item.id,
      MaLoai: item.maLoai,
      Ten: item.ten,
    });
  }
  // SUA LOAI TU DIEN
  // THEM LOAI TU DIEN
  CreateOrUpdate() {
    if (this.dataTuDien.value.Id == this.IdNull) {
      this.tudien.Create(this.dataTuDien.value).subscribe(
        (res) => {
          this.getPage();
          this.toarst.success('Cập nhật thành công !', 'Thông báo');
        },
        (err) => {
          console.log(err);
          this.toarst.error('Thao tác thất bại!', 'Thông báo');
        }
      );
    } else {
      this.tudien.Update(this.dataTuDien.value).subscribe(
        (res) => {
          this.getPage();
          this.toarst.success('Cập nhật thành công !', 'Thông báo');
        },
        (err) => {
          console.log(err);
          this.toarst.error('Thao tác thất bại!', 'Thông báo');
        }
      );
    }
  }

  DeleteById(id) {
    this.tudien.Delete(id).subscribe(
      (res) => {
        this.getPage();
        this.toarst.success('Cập nhật thành công !', 'Thông báo');
      },
      (err) => {
        console.log(err);
        this.toarst.error('Thao tác thất bại!', 'Thông báo');
      }
    );
  }
  //
  Clear() {
    this.dataTuDien = this.fb.group({
      Id: this.IdNull,
      MaLoai: '',
      Ten: '',
    });
  }
}
