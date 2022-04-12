import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerComponent } from './divider.component';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    DividerComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule
  ],
  exports: [
    DividerComponent
  ]
})
export class DividerModule { }
