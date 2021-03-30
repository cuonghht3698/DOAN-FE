import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** App Common */

import { MatButtonModule } from '@angular/material/button';
import { CatChuoiPipe } from './components/khachhang/pipe/catchuoi.pipe';
import { TienTePipe } from './services/pipes/curency.pipe';
import { DemGio } from './services/pipes/demgio.pipe';
import { DocTienPipe } from './services/pipes/doctien.pipe';
import { SubStringPipe } from './services/pipes/substring.pipe';

@NgModule({
  entryComponents: [],
  declarations: [
    TienTePipe,
    SubStringPipe,
    DocTienPipe,
    DemGio
    //CatChuoiPipe
  ],
  providers: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  exports: [
    TienTePipe,
    SubStringPipe,
    DocTienPipe,
    DemGio
    //CatChuoiPipe
  ],
})
export class SharedModule {}
