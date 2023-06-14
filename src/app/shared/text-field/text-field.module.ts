import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './text-field.component';
import { FieldTitleModule } from '../field-title/field-title.module';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
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
