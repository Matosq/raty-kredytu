import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoTooltipComponent } from './info-tooltip.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    InfoTooltipComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [
    InfoTooltipComponent
  ]
})
export class InfoTooltipModule { }
