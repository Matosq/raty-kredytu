import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFieldComponent } from './select-field.component';
import { FieldTitleModule } from '../field-title/field-title.module';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';



@NgModule({
  declarations: [
    SelectFieldComponent
  ],
  imports: [
    CommonModule,
    FieldTitleModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [SelectFieldComponent]
})
export class SelectFieldModule { }
