import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './input-field.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FieldTitleModule } from '../field-title/field-title.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';


@NgModule({
  declarations: [
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    IconModule,
    FieldTitleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputFieldComponent
  ]
})
export class InputFieldModule { }
