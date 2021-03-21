import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/danhmuc/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  constructor(private role: RoleService) {}
  sSearch = {
    sSearch: '',
    pageIndex: 0,
    pageSize: 10,
  };
  data: any;
  ngOnInit(): void {
    this.getPage();
  }
  getPage() {
    this.role.getPage(this.sSearch).subscribe((res) => {
      this.data = res;
    });
  }
}
