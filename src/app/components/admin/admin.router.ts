import { CauhinhComponent } from './danhmuc/cauhinh/cauhinh.component';
import { NhacungcapComponent } from './danhmuc/nhacungcap/nhacungcap.component';
import { UserprofileComponent } from './danhmuc/userprofile/userprofile.component';
import { Routes } from '@angular/router';
import { BaocaoComponent } from './baocao/baocao.component';
import { LoaitudienComponent } from './danhmuc/loaitudien/loaitudien.component';
import { TudienComponent } from './danhmuc/tudien/tudien.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TinhthanhComponent } from './danhmuc/tinhthanh/tinhthanh.component';
import { SanphamComponent } from './danhmuc/sanpham/sanpham.component';

export const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    children:[
      {
        path:'',
        redirectTo:'user',
        pathMatch:'full'
      },
    {
      path:'user',
      component:UserComponent
    },
    {
      path:'userprofile',
      component:UserprofileComponent
    },{
      path:'baocao',
      component:BaocaoComponent
    },
    {
      path:'danhmuc',
      children:[
        {
          path:'loaitudien',
          component: LoaitudienComponent
        },
        {
          path:'tudien',
          component: TudienComponent
        },
        {
          path:'tinhthanh',
          component: TinhthanhComponent
        },
        {
          path:'nhacungcap',
          component: NhacungcapComponent
        },
        {
          path:'cauhinh',
          component: CauhinhComponent
        },
        {
          path:'sanpham',
          component: SanphamComponent
        }
      ]
    }]
  }
]
