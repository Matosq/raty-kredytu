import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './input-field.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FieldTitleModule } from '../field-title/field-title.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FieldTitleModule,
    FormsModule
  ],
  exports: [
    InputFieldComponent
  ]
})
export class InputFieldModule { }
