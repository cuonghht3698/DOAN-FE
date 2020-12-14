import { Routes } from '@angular/router';
import { BaocaoComponent } from './baocao/baocao.component';
import { LoaitudienComponent } from './danhmuc/loaitudien/loaitudien.component';
import { TudienComponent } from './danhmuc/tudien/tudien.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TablesComponent } from './tables/tables.component';
import { UserComponent } from './user/user.component';

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
      path:'table',
      component:TablesComponent
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
        }
      ]
    }]
  }
]
