import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './input-field.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
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
