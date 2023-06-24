import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { IconModule } from '../shared/icon/icon.module';
import { ClipboardModule } from '@angular/cdk/clipboard';


@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    ClipboardModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
