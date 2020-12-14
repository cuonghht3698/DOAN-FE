import { AuthGuard } from './auth/auth.groud';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { CommonModule } from '@angular/common'
import { LoginComponent } from './layouts/login/login.component';
import { Role } from './services/ERole';
import { PagenotfoundComponent } from './layouts/pagenotfound/pagenotfound.component';


const routes: Routes = [
  {
    path: '',
    //component: LoginComponent,
    // canActivate: [AuthGuard],
    //  data: {
    //  roles: [Role.Admin, Role.NhanVien, Role.GiamDoc],
    //  },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren:() => import('./components/admin/admin.module').then(a =>a.AdminModule)
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'**',
    component:PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
