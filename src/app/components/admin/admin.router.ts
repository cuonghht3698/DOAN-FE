import { CauhinhComponent } from './danhmuc/cauhinh/cauhinh.component';
import { NhacungcapComponent } from './danhmuc/nhacungcap/nhacungcap.component';
import { UserprofileComponent } from './danhmuc/userprofile/userprofile.component';
import { Routes } from '@angular/router';
import { LoaitudienComponent } from './danhmuc/loaitudien/loaitudien.component';
import { TudienComponent } from './danhmuc/tudien/tudien.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TinhthanhComponent } from './danhmuc/tinhthanh/tinhthanh.component';
import { SanphamComponent } from './danhmuc/sanpham/sanpham.component';
import { MenuComponent } from './danhmuc/menu/menu/menu.component';
import { RolemenuComponent } from './danhmuc/rolemenu/rolemenu.component';
import { RoleComponent } from './danhmuc/role/role.component';
import { SanphamOptionComponent } from './directives/sanpham-option/sanpham-option.component';
import { NhaphangComponent } from './sanpham/nhaphang/nhaphang.component';
import { OptionSPComponent } from './sanpham/option-sp/option-sp.component';
import { QuanlyDonghangComponent } from './sanpham/quanly-donghang/quanly-donghang.component';
import { ChitietDonhangComponent } from './sanpham/chitiet-donhang/chitiet-donhang.component';
import { BaocaoBanhangComponent } from './baocao/baocao-banhang/baocao-banhang.component';
import { TonkhoComponent } from './baocao/tonkho/tonkho.component';
import { QuanlyChatComponent } from './danhmuc/quanly-chat/quanly-chat.component';
import { ThongsokythuatComponent } from './danhmuc/thongsokythuat/thongsokythuat.component';
import { BlogComponent } from './danhmuc/blog/blog.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full',
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'userprofile',
        component: UserprofileComponent,
      },
      {
        path: 'danhmuc',
        children: [
          {
            path: 'loaitudien',
            component: LoaitudienComponent,
          },
          {
            path: 'tudien',
            component: TudienComponent,
          },
          {
            path: 'tinhthanh',
            component: TinhthanhComponent,
          },
          {
            path: 'nhacungcap',
            component: NhacungcapComponent,
          },
          {
            path: 'cauhinh',
            component: CauhinhComponent,
          },
          {
            path: 'sanpham',
            component: SanphamComponent,
          },
          {
            path: 'menu',
            component: MenuComponent,
          },
          {
            path: 'rolemenu/:id',
            component: RolemenuComponent,
          },
          {
            path: 'role',
            component: RoleComponent,
          },
          {
            path: 'sanpham/option',
            component: OptionSPComponent,
          },
          {
            path: 'nhaphang',
            component: NhaphangComponent,
          },
          {
            path: 'donhang',
            component: QuanlyDonghangComponent,
          },
          {
            path: 'chitietdonhang',
            component: ChitietDonhangComponent,
          },
          {
            path: 'baocaobanhang',
            component: BaocaoBanhangComponent,
          },
          {
            path: 'tonkho',
            component: TonkhoComponent,
          },
          {
            path: 'quanlytinnhan',
            component: QuanlyChatComponent,
          },
          {
            path: 'thongsokythuat',
            component: ThongsokythuatComponent,
          },
          {
            path: 'blog',
            component: BlogComponent,
          },
        ],
      },
    ],
  },
];
