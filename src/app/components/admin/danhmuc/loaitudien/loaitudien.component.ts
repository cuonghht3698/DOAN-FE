import { ToastrService } from 'ngx-toastr';
import { GuidId } from './../../../../services/ERole';
import { LoaiTuDien } from './../../../../models/loaitudien.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoaitudienService } from 'src/app/services/danhmuc/loaitudien.service';

@Component({
  selector: 'app-loaitudien',
  templateUrl: './loaitudien.component.html',
  styleUrls: ['./loaitudien.component.css']
})
export class LoaitudienComponent implements OnInit  {
  displayedColumns: string[] = ['stt', 'name', 'ma','xem', 'action'];
  dataSource :any;
  dsLoaiTuDien;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private loaitudien:LoaitudienService,private fb:FormBuilder,private toarst:ToastrService) { }
  // DATA SEARCH
  search = {
    sSearch : '',
    pageIndex : 0,
    pageSize : 10
  }
  openCRUD = false;
  IdNull = GuidId.EmptyId;
  TotalItem:number;
  dataLoaiTuDien:FormGroup;
  dataRes: Array<LoaiTuDien>;
  ngOnInit(): void {
    this.getPage();
    this.dataLoaiTuDien = this.fb.group({
      Id : this.IdNull,
      MaLoai: "",
      Ten: ""
    });
  }
  // CHANGE PAGE INDEX OR PAGE SIZE
  getPaginate(event){
    this.search.pageIndex = event.pageIndex;
    this.search.pageSize = event.pageSize;
    this.getPage();


  }


  // GET PAGE LOAI TU DIEN
  getPage(){
    this.loaitudien.GetPage((this.search)).subscribe(
      (res:any)=>{
        const ELEMENT_DATA = res.list;
        this.TotalItem = res.total;
        this.dataSource = ELEMENT_DATA;
        this.dataSource.paginator = this.paginator;

      },
      err => {

      }
    )
  }


  SelectRow(item){
    this.dataLoaiTuDien = this.fb.group({
      Id : item.id,
      MaLoai: item.maLoai,
      Ten: item.ten
    })
    this.openCRUD = true;
  }
  // SUA LOAI TU DIEN
  // THEM LOAI TU DIEN
  CreateOrUpdate(){
    if(this.dataLoaiTuDien.value.Id == this.IdNull){
      this.loaitudien.Create(this.dataLoaiTuDien.value).subscribe(
        (res)=>{
          this.getPage();
          this.toarst.success("Cập nhật thành công !", "Thông báo");
        },
        err =>{
          this.toarst.error("Thao tác thất bại!", "Thông báo");
        });
    }
    else{
      this.loaitudien.Update(this.dataLoaiTuDien.value).subscribe(
        (res)=>{
          this.getPage();
          this.toarst.success("Cập nhật thành công !", "Thông báo");
        },
        err =>{
          this.toarst.error("Thao tác thất bại!", "Thông báo");
        });
    }
  }

  DeleteById(id){
    this.loaitudien.Delete(id).subscribe(
      (res)=>{
        this.getPage();
        this.toarst.success("Cập nhật thành công !", "Thông báo");
      },
      err =>{
        this.toarst.error("Thao tác thất bại!", "Thông báo");
      });
  }
  //
  Clear(){
    this.dataLoaiTuDien = this.fb.group({
      Id : this.IdNull,
      MaLoai: "",
      Ten: ""
    });
  }
}
