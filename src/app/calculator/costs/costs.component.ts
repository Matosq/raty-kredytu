import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ButtonConfig } from 'src/app/shared/models/button-config.model';
import { IconName } from 'src/app/shared/models/icon-names.model';
import { Cost, CostsType } from '../models/costs.model';
import { CreditParameterDatepicker, CreditParameterInputField, CreditParameterSelectField, CreditParameterTextField } from '../models/credit-parameter.model';
import { DateRange } from '../models/date.model';
import { SectionCard, SectionCardHeader } from '../models/section-card.model';
import { CostsService } from './costs.service';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CostsComponent implements SectionCard, OnInit {
  private readonly cost: Cost = {
    name: '',
    period: { startDate: null, endDate: null },
    type: CostsType.FIXED_AMOUNT,
    value: 0
  };
  public readonly cardHeader = SectionCardHeader.COSTS;
  public selectedCostsType = CostsType.FIXED_AMOUNT;
  public CostsType = CostsType;
  public readonly costsName: CreditParameterTextField = {
    fieldTitle: 'nazwa',
    value: '',
    placeholder: 'np. ubezpieczenie'
  }

  public readonly selectField: CreditParameterSelectField = {
    fieldTitle: 'rodzaj kosztu',
    options: [
      { value: CostsType.FIXED_AMOUNT },
      { value: CostsType.BALANCE_RATE },
      { value: CostsType.CREDIT_AMOUNT_RATE }
    ],
    defaultValue: { value: CostsType.FIXED_AMOUNT },
  }

  public readonly dateRangepPicker: CreditParameterDatepicker = {
    fieldTitle: 'okres płacenia',
    label: 'miesiąc/rok - miesiąc/rok'
  }

  public readonly costsInputField: CreditParameterInputField = {
    fieldTitle: 'miesięczny koszt',
    label: 'zł',
    value: 0,
    stepValue: 100
  }

  public readonly costsBalanceRateInputField: CreditParameterInputField = {
    fieldTitle: 'oprocentowanie salda kredytu',
    label: '%',
    value: 1,
    stepValue: 0.1
  }

  public readonly costsCreditRateInputField: CreditParameterInputField = {
    fieldTitle: 'oprocentowanie kwoty kredytu',
    label: '%',
    value: 1,
    stepValue: 0.1
  }

  public readonly addCostsButton: ButtonConfig = {
    text: 'dodaj koszt',
    icon: IconName.ADD
  }

  constructor(private costsService: CostsService) { }


  ngOnInit(): void {

  }

  public onCostsNameChange(name: string): void {
    this.cost.name = name;
  }

  public onDateRangeChange(dateRange: DateRange): void {
    this.cost.period = dateRange;
  }

  public onSelectFieldChange(costsType: CostsType): void {
    this.cost.type = costsType;
    this.selectedCostsType = costsType;
  }

  public onInputFieldChange(value: number): void {
    this.cost.value = value;
    console.log(value);
  }

  public addCost(): void {
    this.costsService.addCost(this.cost);
  }
}
