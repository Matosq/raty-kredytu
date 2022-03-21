import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonToggleComponent } from './button-toggle.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FieldTitleModule } from '../field-title/field-title.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ButtonToggleComponent
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    FieldTitleModule,
    FormsModule
  ],
  exports: [
    ButtonToggleComponent
  ]
})
export class ButtonToggleModule { }
