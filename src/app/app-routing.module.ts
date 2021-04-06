import { AuthGuard } from './auth/auth.groud';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './layouts/login/login.component';
import { Role } from './services/ERole';
import { PagenotfoundComponent } from './layouts/pagenotfound/pagenotfound.component';
import { RegistrationComponent } from './layouts/registration/registration.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'shop',
        pathMatch: 'full',
      },
      {
        path: 'quanly',
        data: { active: true },
        loadChildren: () =>
          import('./components/admin/admin.module').then((a) => a.AdminModule),
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('./components/khachhang/khachhang.module').then(
            (a) => a.KhachHangModule
          ),
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dangky',
    component: RegistrationComponent,
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
