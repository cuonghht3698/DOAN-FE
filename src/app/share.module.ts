import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** App Common */

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  entryComponents: [
  ],
  declarations: [

  ],
  providers: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [
  ]
})
export class SharedModule { }
