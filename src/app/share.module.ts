import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** App Common */

import { MatButtonModule } from '@angular/material/button';
import { CatChuoiPipe } from './components/khachhang/pipe/catchuoi.pipe';
import { TienTePipe } from './services/pipes/curency.pipe';
import { DocTienPipe } from './services/pipes/doctien.pipe';
import { SubStringPipe } from './services/pipes/substring.pipe';

@NgModule({
  entryComponents: [],
  declarations: [
    TienTePipe,
    SubStringPipe,
    DocTienPipe,
    //CatChuoiPipe
  ],
  providers: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  exports: [
    TienTePipe,
    SubStringPipe,
    DocTienPipe,
    //CatChuoiPipe
  ],
})
export class SharedModule {}
