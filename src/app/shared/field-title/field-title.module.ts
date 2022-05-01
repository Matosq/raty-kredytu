import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldTitleComponent } from './field-title.component';
import { InfoTooltipModule } from '../info-tooltip/info-tooltip.module';



@NgModule({
  declarations: [
    FieldTitleComponent
  ],
  imports: [
    CommonModule,
    InfoTooltipModule
  ],
  exports: [
    FieldTitleComponent
  ]
})
export class FieldTitleModule { }
