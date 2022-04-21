import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import moment, { Moment } from 'moment';
import { ButtonConfig } from 'src/app/shared/models/button-config.model';
import { IconName } from 'src/app/shared/models/icon-names.model';
import { Cost, CostsType } from '../models/costs.model';
import { CreditParameterDatepicker, CreditParameterInputField, CreditParameterSelectField, CreditParameterTextField } from '../models/credit-parameter.model';
import { SectionCard, SectionCardHeader } from '../models/section-card.model';
import { CostPosition, CostsService } from './costs.service';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CostsComponent implements SectionCard, OnInit {
  private readonly cost: Cost = {
    name: '',
    date: null,
    numberOfMonths: 0,
    type: CostsType.FIXED_AMOUNT,
    value: 0
  };
  public currentCosts: CostPosition[] = [];
  public readonly cardHeader = SectionCardHeader.COSTS;
  public selectedCostsType = CostsType.FIXED_AMOUNT;
  public readonly CostsType = CostsType;
  public readonly costsNameTextField: CreditParameterTextField = {
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

  public datePicker: CreditParameterDatepicker = {
    fieldTitle: 'data pierwszej płatności',
    label: 'miesiąc i rok'
  }

  public readonly monthsInputField: CreditParameterInputField = {
    fieldTitle: 'okres trwania płatności',
    label: 'liczba miesięcy',
    value: 0,
    stepValue: 1
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
    value: 0,
    stepValue: 0.1
  }

  public readonly costsCreditRateInputField: CreditParameterInputField = {
    fieldTitle: 'oprocentowanie kwoty kredytu',
    label: '%',
    value: 0,
    stepValue: 0.1
  }

  public readonly addCostsButton: ButtonConfig = {
    text: 'dodaj koszt',
    icon: IconName.ADD
  }

  public readonly deleteCostButton: ButtonConfig = {
    text: 'usuń',
    icon: IconName.DELETE
  }

  constructor(private costsService: CostsService) { }


  ngOnInit(): void {

  }

  public onCostsNameChange(name: string): void {
    this.cost.name = name;
  }

  public onDateChange(date: Moment): void {
    this.cost.date = date;
  }

  public onSelectFieldChange(costsType: CostsType): void {
    this.cost.type = costsType;
    this.selectedCostsType = costsType;
  }

  public onInputFieldChange(value: number): void {
    this.cost.value = value;
  }

  public onMonthsFieldChange(value: number): void {
    this.cost.numberOfMonths = value;
  }

  public addCost(): void {
    this.costsService.addCost(this.cost);
    this.clearFieldsValue();
    this.currentCosts = this.costsService.getCosts();
  }

  public deleteCost(cost: CostPosition): void {
    this.costsService.deleteCost(cost);
    this.currentCosts = this.costsService.getCosts();
  }

  public areCurrentCosts(): boolean {
    return this.currentCosts.length > 0;
  }

  public isCostTypeWithCurrency(costsType: CostsType): boolean {
    return costsType === CostsType.FIXED_AMOUNT;
  }

  private clearFieldsValue(): void {
    this.clearNameField();
    this.clearValueFields();
    this.clearMonths();
    this.clearDate();
  }

  private clearNameField(): void {
    this.cost.name = '';
    this.costsNameTextField.value = '';
  }

  private clearValueFields(): void {
    this.costsInputField.value = 0;
    this.costsBalanceRateInputField.value = 0;
    this.costsCreditRateInputField.value = 0;
    this.cost.value = 0;
  }

  private clearMonths(): void {
    this.monthsInputField.value = 0;
    this.cost.numberOfMonths = 0;
  }

  private clearDate(): void {
    this.cost.date = moment(),
    this.datePicker.date = undefined;
    this.datePicker = cloneDeep(this.datePicker);
  }
}
