import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CostsType } from 'src/app/calculator/models/costs.model';
import { CreditParameterSelectField, ParameterField } from 'src/app/calculator/models/credit-parameter.model';


@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFieldComponent implements ParameterField, OnInit, OnDestroy {
  @Input() configuration!: CreditParameterSelectField;
  @Output() valueChange = new EventEmitter<CostsType>();
  public selectedValueForm = new UntypedFormControl(CostsType.FIXED_AMOUNT);
  private selectedValueFormSubscription!: Subscription;

  public ngOnInit(): void {
    this.selectedValueFormSubscription = this.selectedValueForm.valueChanges.subscribe((value: CostsType) => {
      this.valueChange.emit(value);
    });
  }

  public ngOnDestroy(): void {
    this.selectedValueFormSubscription?.unsubscribe();
  }
}
