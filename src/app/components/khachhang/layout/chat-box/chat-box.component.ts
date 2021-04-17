import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { Avatar } from 'src/app/services/constrans';
import { TinNhanService } from 'src/app/services/danhmuc/tinnhan.service';
import { TraLoiTinNhanService } from 'src/app/services/danhmuc/traloitinnhan.service';
import { GuidId } from 'src/app/services/ERole';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  NoiDung = '';
  Id ='';
  DSTinNhan:any;
  @Input() check = false;
  constructor(
    private auth: AuthenticationService,
    private tinnhan: TinNhanService,
    private traloi: TraLoiTinNhanService,
    private _el: ElementRef
  ) {}
   scrollToBottom() {
    const el: HTMLDivElement = this._el.nativeElement;
    el.scrollTop = Math.max(0, el.scrollHeight - el.offsetHeight);
  }
  url = environment.ApiUrl + "anh/get/";
  dsAnh = Avatar;
  chuaDangNhap = false;
  ngOnInit(): void {
    if (this.auth.getUserLocal()) {
      var user = this.auth.getUserLocal();
      this.CreateOrGet(user.id);
      this.chuaDangNhap = false;
      setInterval(() => {
        if (this.check) {
          this.GetTinNhan(this.Id);
        }
      }, 3000);
      if (user.checkChuaDangNhap) {
        this.chuaDangNhap = true;
      }
    }else{

    }
  }

  Enter(event){
    if (event == 13) {
      this.Sent();
    }
  }
  Sent() {
    if (this.NoiDung == '') {
      return;
    }
    var data:TraLoiModel = {
      Id : GuidId.EmptyId,
      Active:true,
      IdTinNhan: this.Id,
      NoiDung:this.NoiDung,
      ThoiGianTao:new Date(),
      Watched:false
    }
    this.traloi.Sent(data).subscribe((res)=>{
      this.GetTinNhan(this.Id);
      this.NoiDung = '';

    })
  }
  GetTinNhan(Id) {
    this.traloi.GetById(Id).subscribe((res:any) => {
      this.DSTinNhan = res;

    });
  }
  CreateOrGet(UserId) {
    this.tinnhan.CreateOrGet(UserId).subscribe((res: any) => {
      this.Id = res.id;
      this.GetTinNhan(res.id);
    });
  }
  Delete(Id){
    this.traloi.ThuHoi(Id).subscribe((res)=>{
      this.GetTinNhan(this.Id);
    })
  }
}


export class TraLoiModel{
  Id:string;
  IdTinNhan: string;
  NoiDung:string;
  Active:boolean;
  ThoiGianTao:Date;
  Watched: boolean;
}
