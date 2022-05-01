import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CreditParameterTextField, ParameterField } from 'src/app/calculator/models/credit-parameter.model';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextFieldComponent implements ParameterField {
  @Input() configuration!: CreditParameterTextField;
  @Output() valueChange = new EventEmitter<string>();

  public onChange(value: string): void {
    this.configuration.value = value;
    this.valueChange.emit(this.configuration.value);
  }
}
