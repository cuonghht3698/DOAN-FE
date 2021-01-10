import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from 'src/app/services/danhmuc/menu.service';
import { RoleMenuService } from 'src/app/services/danhmuc/rolemenu.service';

@Component({
  selector: 'app-rolemenu',
  templateUrl: './rolemenu.component.html',
  styleUrls: ['./rolemenu.component.css']
})
export class RolemenuComponent implements OnInit {

  constructor(
    private roleMenu: RoleMenuService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private menu:MenuService,
    private route: ActivatedRoute,
  ) {}
  data:any;
  IdRole:any;
  ngOnInit(): void {
    this.getPage();
    this.route.queryParams.subscribe(params => {
      this.IdRole = params['id'];
    });
    console.log(this.IdRole);

  }
  getPage(){
    this.roleMenu.getPage().subscribe((res)=>{
      this.data = res;
      console.log(res);

    })
  }
}
