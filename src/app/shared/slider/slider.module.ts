import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { IconModule } from '../icon/icon.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SliderComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    IconModule,
    MatButtonModule,
    FormsModule
  ],
  exports: [
    SliderComponent
  ]
})
export class SliderModule { }
