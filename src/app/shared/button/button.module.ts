import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    IconModule
  ],
  exports: [
    ButtonComponent
  ]
})
export class ButtonModule { }
