import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { CreditParameterButtonTogle, ParameterField } from 'src/app/calculator/models/credit-parameter.model';
import { Installments } from './installment.model';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonToggleComponent implements ParameterField, OnInit {
  @Input() configuration: CreditParameterButtonTogle = {
    fieldTitle: '',
    value: Installments.EQUAL
  };
  @Output() valueChange = new EventEmitter<Installments>();
  public installmentEqual = Installments.EQUAL;
  public installmentDeacrising = Installments.DEACRISING;
  constructor() { }

  ngOnInit(): void {
  }

  public onToggle({ value }: MatButtonToggleChange): void {
    this.valueChange.emit(value);
  }
}
