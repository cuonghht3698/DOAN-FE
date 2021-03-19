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
import { TienTePipe } from 'src/app/services/pipes/curency.pipe';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CatChuoiPipe } from './pipe/catchuoi.pipe';
import { DanhmucComponent } from './layout/danhmuc/danhmuc.component';
import { DetailComponent } from './layout/detail/detail.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ShoppingCartComponent } from './layout/shopping-cart/shopping-cart.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
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
    TienTePipe,
    CatChuoiPipe,
    DanhmucComponent,
    DetailComponent,
    ShoppingCartComponent
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
