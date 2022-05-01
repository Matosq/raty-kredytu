import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoTooltipComponent } from './info-tooltip.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '../icon/icon.module';


@NgModule({
  declarations: [
    InfoTooltipComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    IconModule
  ],
  exports: [
    InfoTooltipComponent
  ]
})
export class InfoTooltipModule { }
