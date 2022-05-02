
import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreditParameterInputField, ParameterField } from 'src/app/calculator/models/credit-parameter.model';
import { fadeSlideInAnimation } from 'src/app/core/animations/fadeSlideIn';
import { IconName } from '../models/icon-names.model';


@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  animations: [fadeSlideInAnimation]
})
export class InputFieldComponent implements ParameterField, OnInit, AfterContentInit {
  @Input() configuration!: CreditParameterInputField;
  @Output() valueChange = new EventEmitter<number>();
  public show = false;
  public readonly IconNameType = IconName;
  constructor() { }

  ngOnInit(): void {
  
  }

  ngAfterContentInit(): void {
    this.show = true;
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
