import { Routes } from '@angular/router';
import { DanhmucComponent } from './layout/danhmuc/danhmuc.component';
import { MainComponent } from './main/main.component';
import { TrangchuComponent } from './trangchu/trangchu.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'trangchu',
        pathMatch: 'full',
      },
      {
        path: 'trangchu',
        component: TrangchuComponent,
      },
      {
        path: 'danhmuc/:ma',
        component: DanhmucComponent,
      },
    ],
  },
];
