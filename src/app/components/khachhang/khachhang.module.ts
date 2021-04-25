import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { routes } from './khachhang.router';

// material design
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MaterialModule } from '../../material.module';
import { NgxPopper } from 'angular-popper';

import { HttpClientModule } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { TrangchuComponent } from './trangchu/trangchu.component';
import { BlogComponent } from './layout/blog/blog.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NarBarComponent } from './layout/nar-bar/nar-bar.component';
import { DealComponent } from './layout/deal/deal.component';
import { TopProductComponent } from './layout/top-product/top-product.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { DanhmucComponent } from './layout/danhmuc/danhmuc.component';
import { DetailComponent } from './layout/detail/detail.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ShoppingCartComponent } from './layout/shopping-cart/shopping-cart.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { LoginComponent } from './layout/login/login.component';
import { LichsumuahangComponent } from './layout/lichsumuahang/lichsumuahang.component';
import { UserinfoComponent } from './layout/userinfo/userinfo.component';
import { SharedModule } from 'src/app/share.module';
import { ChatBoxComponent } from './layout/chat-box/chat-box.component';
import { QuenmatkhauComponent } from './layout/quenmatkhau/quenmatkhau.component';
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
    SharedModule,
    NgxPopper,
    HttpClientModule,
    IvyCarouselModule,
    MatCarouselModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    })
  ],
  exports: [],
  declarations: [
    HeaderComponent,
    TrangchuComponent,
    FooterComponent,
    NarBarComponent,
    TopProductComponent,
    DealComponent,
    BlogComponent,
    MainComponent,
    //CatChuoiPipe,
    DanhmucComponent,
    DetailComponent,
    LoginComponent,
    LichsumuahangComponent,
    UserinfoComponent,
    ShoppingCartComponent,
    ChatBoxComponent,
    QuenmatkhauComponent
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [],
})
export class KhachHangModule {}
