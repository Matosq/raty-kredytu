import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerRangeComponent } from './datepicker-range.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FieldTitleModule } from '../field-title/field-title.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    DatepickerRangeComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    FieldTitleModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [
    DatepickerRangeComponent
  ]
})
export class DatepickerRangeModule { }
