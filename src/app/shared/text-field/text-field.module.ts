import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './text-field.component';
import { FieldTitleModule } from '../field-title/field-title.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TextFieldComponent
  ],
  imports: [
    CommonModule,
    FieldTitleModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  exports: [TextFieldComponent]
})
export class TextFieldModule { }
