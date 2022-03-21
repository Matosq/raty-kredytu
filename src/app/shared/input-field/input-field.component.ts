import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreditParameterInputField, ParameterField } from 'src/app/calculator/models/credit-parameter.model';


@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements ParameterField, OnInit {
  @Input() configuration!: CreditParameterInputField;
  @Output() valueChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public onChange(value: number): void {
    this.configuration.value = value;
    this.updateValue();
  }


  public increase(): void {
    if (!this.configuration.stepValue) { return; }
    this.configuration.value = Math.round((Number(this.configuration.value) + this.configuration.stepValue) * 100) / 100;
    this.updateValue();
  }

  public decrease(): void {
    if (!this.configuration.stepValue) { return; }
    this.configuration.value = Math.round((Number(this.configuration.value) - this.configuration.stepValue) * 100) / 100;
    this.updateValue();
  }

  private updateValue(): void {
    this.valueChange.emit(Number(this.configuration.value));
  }
}
