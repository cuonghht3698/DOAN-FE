import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'selector-name',
  templateUrl: './changepass.popup.html',
})
export class PopChangePass implements OnInit {

  dataPass: PassModel = {
    Id: '',
    PasswordOld: '',
    PasswordNew: '',
    PasswordConfirm: '',

  };
  constructor(
    private popupRes: MatDialogRef<PopChangePass>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private user: UserService,
    private toarst: ToastrService
  ) { }

  ngOnInit() {
    this.dataPass.Id = this.data.obj.Id;


  }
  SaveChange() {
    this.user.changePassword(this.dataPass).subscribe((res) => {
      this.toarst.success("Đổi mật khẩu thành công", "Thông báo");
      this.ClosePopup();

    }, err => {

    })
  }
  ClosePopup() {
    this.popupRes.close();
  }
}

export class PassModel {
  Id: string
  PasswordOld: string
  PasswordNew: string
  PasswordConfirm: string

}
