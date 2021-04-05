import { Component, ElementRef, OnInit } from '@angular/core';
import { TinNhanService } from 'src/app/services/danhmuc/tinnhan.service';
import { TraLoiTinNhanService } from 'src/app/services/danhmuc/traloitinnhan.service';
import { GuidId } from 'src/app/services/ERole';
import * as _ from "lodash";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-quanly-chat',
  templateUrl: './quanly-chat.component.html',
  styleUrls: ['./quanly-chat.component.css'],
})
export class QuanlyChatComponent implements OnInit {
  constructor(
    private tinnhan: TinNhanService,
    private traloi: TraLoiTinNhanService,
    private _el: ElementRef,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {}

  IdTinNhan = '';
  NoiDung = '';
  loadF = true;
  ngOnInit(): void {
  this.activatedRoute.queryParams.subscribe((res)=>{
    this.tinnhan.GetIdTinNhanByIdUser(res.Id).subscribe((res1:any)=>{
      this.IdTinNhan = res1.id;
    });
  });
    this.getDsTinNhan();
    setInterval(() => {
      this.getDsTinNhan();
      this.getTinNhanById(this.IdTinNhan);
    }, 3000);
  }
  DsListChat = [];
  DsFilterListChat = [];
  dataChat = [];
  ten = '';
  scrollToBottom() {
    const el: HTMLDivElement = this._el.nativeElement;
    el.scrollTop = Math.max(0, el.scrollHeight - el.offsetHeight);
  }

  getDsTinNhan() {
    this.tinnhan.GetDSTinNhanByTen(this.ten).subscribe((res: any) => {
      this.DsListChat = res;
      if (this.loadF && this.IdTinNhan == '') {
        this.getTinNhanById(res[0].id);
        this.loadF = false;
      }
    });
  }
  // load lai khi click list
  RefeshGetDsTinNhan() {
    this.tinnhan.GetDSTinNhanByTen(this.ten).subscribe((res: any) => {
      this.DsListChat = res;

    });
  }
  getTinNhanById(Id) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {Id:Id},
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
    this.IdTinNhan = Id;
    this.traloi.GetById(Id).subscribe((res: any) => {
      this.dataChat = res;
      console.log(res);

    });
    this.traloi.Watched(Id).subscribe((res) => {
      this.RefeshGetDsTinNhan();
    });
  }

  Sent() {
    var data = {
      Id: GuidId.EmptyId,
      Active: false,
      IdTinNhan: this.IdTinNhan,
      NoiDung: this.NoiDung,
      ThoiGianTao: new Date(),
      Watched: false,
    };
    this.traloi.Sent(data).subscribe((res) => {
      this.getTinNhanById(data.IdTinNhan);
    });
  }
}
