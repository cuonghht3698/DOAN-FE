import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  showChat = true;
  constructor() { }

  ngOnInit(): void {
  }
  HideChat(){
    this.showChat = true;
  }
  ShowChat(){
    this.showChat = false;
  }
}
