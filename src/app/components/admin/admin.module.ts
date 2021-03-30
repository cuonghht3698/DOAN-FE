import { PoppupCauHinh } from './danhmuc/cauhinh/popup/cauhinh.popup';
import { PopupUserProfile } from './danhmuc/userprofile/popup/userproflie.popup';
import { TudienComponent } from './danhmuc/tudien/tudien.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './admin.router';
import { DashboardComponent } from './dashboard/dashboard.component';

// material design
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MaterialModule } from '../../material.module';
import { NgxPopper } from 'angular-popper';
import { NavbarComponent } from './navbar/navbar.component';

import { LbdChartComponent } from './directives/lbd-chart/lbd-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaitudienComponent } from './danhmuc/loaitudien/loaitudien.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { PopTuDien } from './danhmuc/tudien/popup/tudien.popup';
import { UserComponent } from './user/user.component';
import { PopChangePass } from './user/DialogChangePass/changepass.popup';
import { UserprofileComponent } from './danhmuc/userprofile/userprofile.component';
import { TinhthanhComponent } from './danhmuc/tinhthanh/tinhthanh.component';
import { NhacungcapComponent } from './danhmuc/nhacungcap/nhacungcap.component';
import { CauhinhComponent } from './danhmuc/cauhinh/cauhinh.component';
import { SanphamComponent } from './danhmuc/sanpham/sanpham.component';
import { TinhThanhDialog } from './danhmuc/tinhthanh/popup/tinhthanh.popup';
import { PopupNCC } from './danhmuc/nhacungcap/popup/nhacungcap.popup';
import { PopupSanPham } from './danhmuc/sanpham/popup/sanpham.popup';
import { MenuComponent } from './danhmuc/menu/menu/menu.component';
import { MenuPopup } from './danhmuc/menu/popup/menu.popup';
import { RolemenuComponent } from './danhmuc/rolemenu/rolemenu.component';
import { RoleComponent } from './danhmuc/role/role.component';
import { SanphamOptionComponent } from './directives/sanpham-option/sanpham-option.component';
import { OptionSPComponent } from './sanpham/option-sp/option-sp.component';
import { NhaphangComponent } from './sanpham/nhaphang/nhaphang.component';
import { SubStringPipe } from 'src/app/services/pipes/substring.pipe';
import { QuanlyDonghangComponent } from './sanpham/quanly-donghang/quanly-donghang.component';
import { ChitietDonhangComponent } from './sanpham/chitiet-donhang/chitiet-donhang.component';
import { TienTePipe } from 'src/app/services/pipes/curency.pipe';
import { SharedModule } from 'src/app/share.module';
import { BaocaoBanhangComponent } from './baocao/baocao-banhang/baocao-banhang.component';
import { TonkhoComponent } from './baocao/tonkho/tonkho.component';
import { QuanlyChatComponent } from './danhmuc/quanly-chat/quanly-chat.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MaterialModule,
    NgxPopper,
    HttpClientModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    DashboardComponent,
    NavbarComponent,
    NavbarComponent,
    LbdChartComponent,
    LoaitudienComponent,
    TudienComponent,
    PopTuDien,
    UserComponent,
    PopChangePass,
    UserprofileComponent,
    PopupUserProfile,
    TinhthanhComponent,
    NhacungcapComponent,
    CauhinhComponent,
    SanphamComponent,
    TinhThanhDialog,
    PopupNCC,
    PoppupCauHinh,
    PopupSanPham,
    MenuComponent,
    MenuPopup,
    RolemenuComponent,
    RoleComponent,
    SanphamOptionComponent,
    OptionSPComponent,
    NhaphangComponent,
    //SubStringPipe,
    QuanlyDonghangComponent,
    ChitietDonhangComponent,
    BaocaoBanhangComponent,
    TonkhoComponent,
    QuanlyChatComponent,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [DashboardComponent],
})
export class AdminModule {}
