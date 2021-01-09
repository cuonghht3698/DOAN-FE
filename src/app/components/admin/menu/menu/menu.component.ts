import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/danhmuc/menu.service';
import { MenuPopup } from '../popup/menu.popup';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private menu: MenuService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAll();
  }
  data: any;
  getAll() {
    this.menu.getAll().subscribe((res) => {
      this.data = res;
    });
  }

  OpenPopup() {
    var dia = this.dialog.open(MenuPopup, {
      width: '600px',
      disableClose: true,
    });
  }
}
