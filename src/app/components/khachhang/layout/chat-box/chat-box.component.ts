import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authService/authentication.service';
import { TinNhanService } from 'src/app/services/danhmuc/tinnhan.service';
import { TraLoiTinNhanService } from 'src/app/services/danhmuc/traloitinnhan.service';
import { GuidId } from 'src/app/services/ERole';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  NoiDung = '';
  Id ='';
  DSTinNhan:any;
  constructor(
    private auth: AuthenticationService,
    private tinnhan: TinNhanService,
    private traloi: TraLoiTinNhanService
  ) {}

  ngOnInit(): void {
    if (this.auth.getUserLocal()) {
      var user = this.auth.getUserLocal();
      this.CreateOrGet(user.id);
    }
  }
  Sent() {
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

    })
  }
  GetTinNhan(Id) {
    this.traloi.GetById(Id).subscribe((res:any) => {
      this.DSTinNhan = res;
      console.log(res);

    });
  }
  CreateOrGet(UserId) {
    this.tinnhan.CreateOrGet(UserId).subscribe((res: any) => {
      this.Id = res.id;
      this.GetTinNhan(res.id);
    });
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
