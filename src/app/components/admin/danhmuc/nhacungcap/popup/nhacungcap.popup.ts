import { GuidId } from './../../../../../services/ERole';
import { ToastrService } from 'ngx-toastr';
import { NhaCungCapService } from './../../../../../services/danhmuc/nhacungcap.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
    selector: 'nahcungcap-pop',
    templateUrl: './nhacungcap.popup.html'
})

export class PopupNCC implements OnInit {
    constructor(private dialog: MatDialogRef<PopupNCC>, @Inject(MAT_DIALOG_DATA) public data,
        private ncc: NhaCungCapService, private toastr: ToastrService) { }
    IdNull = GuidId.EmptyId;
    dataNcc: NccModel = {
        Id: GuidId.EmptyId,
        Ten: '',
        Anh: '',
        Active: true,
        DiaChi: '',
        MoTa: '',
        Sdt: '',
        ThoiGianTao: new Date()

    }
    ngOnInit() {
        if (this.data) {
            const item = this.data;
            this.dataNcc = {
                Id: item.id,
                Active: item.active,
                Anh: item.anh,
                DiaChi: item.diachi,
                MoTa: item.mota,
                Sdt: item.sdt,
                Ten: item.ten,
                ThoiGianTao: item.thoigiantao
            }
        }
    }

    CreateOrUpdate() {
        console.log(this.dataNcc);

        if (!this.data) {
            this.ncc.Create(this.dataNcc).subscribe(
                (res) => {
                    this.toastr.success('Thêm thành công !', 'Thông báo');
                },
                (err) => {
                    console.log(err);
                    this.toastr.error('Thao tác thất bại!', 'Thông báo');
                }
            );
        } else {
            this.ncc.Update(this.dataNcc).subscribe(
                (res) => {
                    this.toastr.success('Cập nhật thành công !', 'Thông báo');
                },
                (err) => {
                    console.log(err);
                    this.toastr.error('Thao tác thất bại!', 'Thông báo');
                }
            );
        }
    }

    Clear() { }
    ClosePopup() {
        this.dialog.close();
    }
}

export interface NccModel {
    Id: string,
    Ten: string,
    DiaChi: string,
    Sdt: string,
    MoTa: string,
    Anh: string,
    Active: boolean,
    ThoiGianTao: Date
}