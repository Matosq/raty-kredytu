import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoTooltipComponent } from './info-tooltip.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
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
