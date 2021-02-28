import { SharedataService } from 'src/app/sharedata.service';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'QLTTB';
  isCollapsed = true;
  constructor(
    private router: Router,
    private share: SharedataService,
    private route: ActivatedRoute
  ) {

  }

  Click() {}
}
