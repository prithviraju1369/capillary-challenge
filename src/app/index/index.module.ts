import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { IndexRoutingModule } from './index.routing';
import { IndexComponent }   from './index.component';


// index module bootstrapping
@NgModule({
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    IndexRoutingModule,
    MaterialModule.forRoot()
  ],
  exports: [],
  declarations: [IndexComponent]
})
export class IndexModule { }
