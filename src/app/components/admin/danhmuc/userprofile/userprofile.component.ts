import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { SearchModel } from './../../../../models/search.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupUserProfile } from './popup/userproflie.popup';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private http: UserService, private dialog: MatDialog, private user: UserService, private toarst: ToastrService) { }

  ngOnInit(): void {
    this.getPage();
  }
  data;
  TotalItem;
  searchUser: SearchModel = {
    sSearch: '',
    pageIndex: 0,
    pageSize: 10,
  }
  getPage() {
    this.http.getPage(this.searchUser).subscribe(
      (res: any) => {
        console.log(res);
        this.data = res.list;
        this.TotalItem = res.total;
      },
      (err) => {
        console.log(err);

      }
    )
  }
  DeleteById(id) {
    this.user.delete(id).subscribe(
      (res) => {
        this.toarst.success("Xóa thành công", "Thông báo");
      },
      (err)=>{
        this.toarst.error("Xóa không thành công", "Thông báo");
      }
    )
  }
  OpenDiaLog(data) {
    const dialog = this.dialog.open(PopupUserProfile, {
      width: '600px',
      height: '550px',
      disableClose: true,
      data: data
    })
    dialog.afterClosed().subscribe((res) => {
      this.getPage();
    })
  }
  getPaginate(event) {
    this.searchUser.pageIndex = event.pageIndex;
    this.searchUser.pageSize = event.pageSize;
    this.getPage();
  }

}
