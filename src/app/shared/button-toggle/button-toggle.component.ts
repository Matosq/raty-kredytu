import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { CreditParameterButtonToggle, ParameterField } from 'src/app/calculator/models/credit-parameter.model';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonToggleComponent<T> implements ParameterField {
  @Input() configuration!: CreditParameterButtonToggle<T>;
  @Output() valueChange = new EventEmitter<T>();

  public onToggle({ value }: MatButtonToggleChange): void {
    this.valueChange.emit(value);
  }
}
