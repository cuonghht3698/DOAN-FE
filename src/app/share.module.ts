import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** App Common */

import { MatButtonModule } from '@angular/material/button';
import { CatChuoiPipe } from './components/khachhang/pipe/catchuoi.pipe';
import { TienTePipe } from './services/pipes/curency.pipe';
import { DemGio } from './services/pipes/demgio.pipe';
import { DocTienPipe } from './services/pipes/doctien.pipe';
import { GetIndexPipe } from './services/pipes/getIndex.pipe';
import { SubStringPipe } from './services/pipes/substring.pipe';

@NgModule({
  entryComponents: [],
  declarations: [
    TienTePipe,
    SubStringPipe,
    DocTienPipe,
    DemGio,
    GetIndexPipe
    //CatChuoiPipe
  ],
  providers: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  exports: [
    TienTePipe,
    SubStringPipe,
    DocTienPipe,
    DemGio,
    GetIndexPipe
    //CatChuoiPipe
  ],
})
export class SharedModule {}
