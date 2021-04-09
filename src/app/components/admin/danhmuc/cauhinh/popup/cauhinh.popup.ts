import { TudienService } from './../../../../../services/danhmuc/tudien.service';
import { GuidId } from './../../../../../services/ERole';
import { ToastrService } from 'ngx-toastr';
import { CauHinhService } from './../../../../../services/danhmuc/cauhinh.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MaTuDien } from 'src/app/services/constrans';

@Component({
    selector: 'cauhinh-pop',
    templateUrl: './cauhinh.popup.html'
})

export class PoppupCauHinh implements OnInit {
    constructor(private dialog: MatDialogRef<PoppupCauHinh>, @Inject(MAT_DIALOG_DATA) public data,
        private ch: CauHinhService, private toastr: ToastrService, private tudien: TudienService) { }
    IdNull = GuidId.EmptyId;
    dataCH: CHModel = {
        Id: GuidId.EmptyId,
        Ten: '',
        Code: this.generate_string(),
        ManHinh: '',
        CPU: '',
        PIN: '',
        RAM: '',
        NGAYSX: new Date(),
        ThoiGianBaoHanh: 0,
        DungLuong: '',
        MoTa: '',
        LoaiCauHinhId: '',


    }
    generate_string() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 8; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    dsLoaiCauHinh;
    dsCauHinh;
    checkDsCh
    ngOnInit() {
        if (this.data) {
            const item = this.data;
            this.dataCH = {
                Id: item.id,
                Ten: item.ten,
                Code: item.code,
                ManHinh: item.manHinh,
                CPU: item.cpu,
                PIN: item.pin,
                RAM: item.ram,
                NGAYSX: item.ngaysx,
                ThoiGianBaoHanh: item.ThoiGianBaoHanh,
                DungLuong: item.dungluong,
                MoTa: item.mota,
                LoaiCauHinhId: item.loaiCauHinhId,
            }
        }
        this.getLoaiCauHinh();
    }

    getLoaiCauHinh() {
        this.tudien.getByLoai(MaTuDien.HangSanXuat).subscribe(
            (res: any) => {
                this.dsLoaiCauHinh = res;
            }
        )
    }

    SelectItem(item) {
        this.dataCH = {
            Id: GuidId.EmptyId,
            Ten: item.ten,
            Code: item.code,
            ManHinh: item.manHinh,
            CPU: item.cpu,
            PIN: item.pin,
            RAM: item.ram,
            NGAYSX: item.ngaysx,
            ThoiGianBaoHanh: item.ThoiGianBaoHanh,
            DungLuong: item.dungluong,
            MoTa: item.mota,
            LoaiCauHinhId: item.loaiCauHinhId,
        }
    }

    getDsCauHinhMau(e) {

        this.ch.FindByLoai(e.value).subscribe((res: any) => {
            this.dsCauHinh = res;
            this.checkDsCh = res.length == 0 ? false : true;

        })
    }
    CreateOrUpdate() {

        if (!this.data) {
            this.ch.Create(this.dataCH).subscribe(
                (res) => {
                    this.toastr.success('Thêm thành công !', 'Thông báo');
                },
                (err) => {
                    this.toastr.error(err.error, 'Thông báo');
                    console.log(err);
                    
                }
            );
        } else {
            this.ch.Update(this.dataCH).subscribe(
                (res) => {
                    this.toastr.success('Cập nhật thành công !', 'Thông báo');
                },
                (err) => {
                    this.toastr.error(err.error, 'Thông báo');
                }
            );
        }
    }

    Clear() { }
    ClosePopup() {
        this.dialog.close();
    }
}

export interface CHModel {
    Id: string,
    Ten: string,
    Code: string,
    ManHinh: string,
    CPU: string,
    PIN: string,
    RAM: string,
    NGAYSX: Date,
    ThoiGianBaoHanh: number,
    DungLuong: string,
    MoTa: string,
    LoaiCauHinhId: string
}
