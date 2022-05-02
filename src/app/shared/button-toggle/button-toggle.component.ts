import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { CreditParameterButtonTogle, ParameterField } from 'src/app/calculator/models/credit-parameter.model';
import { Installments } from './installment.model';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonToggleComponent implements ParameterField {
  @Input() configuration!: CreditParameterButtonTogle;
  @Output() valueChange = new EventEmitter<Installments>();
  public installmentEqual = Installments.EQUAL;
  public installmentDeacrising = Installments.DEACRISING;

  public onToggle({ value }: MatButtonToggleChange): void {
    this.valueChange.emit(value);
  }
}
