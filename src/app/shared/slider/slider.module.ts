import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import { MatSliderModule } from '@angular/material/slider';
import { IconModule } from '../icon/icon.module';
import { MatButtonModule } from '@angular/material/button';
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
