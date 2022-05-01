import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CostsType } from 'src/app/calculator/models/costs.model';
import { CreditParameterSelectField, ParameterField } from 'src/app/calculator/models/credit-parameter.model';


@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectFieldComponent implements ParameterField, OnInit {
  @Input() configuration!: CreditParameterSelectField;
  @Output() valueChange = new EventEmitter<CostsType>();
  public selectedValueForm = new FormControl(CostsType.FIXED_AMOUNT);
  private selectedValueFormSubscription!: Subscription;
  constructor() { }

  public ngOnInit(): void {
    this.selectedValueFormSubscription = this.selectedValueForm.valueChanges.subscribe((value: CostsType) => {
      this.valueChange.emit(value);
    });
  }

  public ngOnDestroy(): void {
    this.selectedValueFormSubscription?.unsubscribe();
  }
}
