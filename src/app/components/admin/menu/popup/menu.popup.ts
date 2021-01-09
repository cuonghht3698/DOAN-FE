import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-app',
  templateUrl: './menu.popup.html',
})
export class MenuPopup implements OnInit {
  constructor() {}

  data = {
    Id: '',
    Icon: '',
    Ten: '',
    Controller: '',
    Link: '',
    MoTa: '',
    ParentId: '',
  };

  ngOnInit() {}
}
