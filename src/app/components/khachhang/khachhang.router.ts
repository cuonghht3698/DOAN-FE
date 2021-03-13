import { Routes } from '@angular/router';
import { DanhmucComponent } from './layout/danhmuc/danhmuc.component';
import { DetailComponent } from './layout/detail/detail.component';
import { ShoppingCartComponent } from './layout/shopping-cart/shopping-cart.component';
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
        path: 'danhmuc',
        component: DanhmucComponent,
      },
      {
        path: 'chitiet',
        component: DetailComponent,
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
      },
    ],
  },
];
