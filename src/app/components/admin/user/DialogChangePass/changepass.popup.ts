import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'selector-name',
  templateUrl: './changepass.popup.html',
})
export class PopChangePass implements OnInit {

  dataPass;
  constructor(
    private popupRes: MatDialogRef<PopChangePass>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.dataPass = this.fb.group({
      PasswordOld:'',
      PasswordNew:'',
      PasswordConfirm:''
    })
  }

  ClosePopup() {
    this.popupRes.close();
  }
}
