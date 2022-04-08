import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreditParameterButtonTogle, CreditParameterDatepicker, CreditParameterInputField, CreditParameterTextField, ParameterField } from 'src/app/calculator/models/credit-parameter.model';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements ParameterField, OnInit {
  @Input() configuration!: CreditParameterTextField;
  @Output() valueChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  public onChange(value: string): void {
    this.configuration.value = value;
    this.valueChange.emit(this.configuration.value);
  }


}
