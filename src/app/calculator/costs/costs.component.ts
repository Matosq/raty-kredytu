import { ChangeDetectionStrategy, Component } from '@angular/core';
import { cloneDeep } from 'lodash';
import moment, { Moment } from 'moment';
import { delay, of } from 'rxjs';
import { fadeSlideInOutAnimation } from 'src/app/core/animations/fadeSlideIn';
import { ButtonConfig, ButtonType } from 'src/app/shared/models/button-config.model';
import { IconName } from 'src/app/shared/models/icon-names.model';
import { Cost, CostsType } from '../models/costs.model';
import { InputFieldValue } from '../models/credit-parameter.model';
import { SectionCard, SectionCardHeader } from '../models/section-card.model';
import { CostsParameters, defaultCost, defaultCostPercentage } from './costs-parameters';
import { CostPosition, CostsService } from './costs.service';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeSlideInOutAnimation]
})
export class CostsComponent extends CostsParameters implements SectionCard {
  private readonly cost: Cost = {
    name: '',
    date: moment(),
    numberOfMonths: 1,
    type: CostsType.FIXED_AMOUNT,
    value: defaultCost
  };
  private isValueFieldValid = true;
  private isMonthsFieldValid = true;
  public currentCosts: CostPosition[] = [];
  public readonly cardHeader = SectionCardHeader.COSTS;
  public selectedCostsType = CostsType.FIXED_AMOUNT;
  public readonly CostsType = CostsType;
  
  public readonly addCostsButton: ButtonConfig = {
    text: 'dodaj koszt',
    icon: IconName.ADD
  }

  public readonly deleteCostButton: ButtonConfig = {
    text: 'usuń',
    icon: IconName.DELETE,
    type: ButtonType.SMALL
  }

  constructor(private costsService: CostsService) {
    super();
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

  public onInputFieldChange(inputFieldValue: InputFieldValue): void {
    this.cost.value = inputFieldValue.value;
    this.isValueFieldValid = this.isFieldValid(inputFieldValue.status);
  }

  public onMonthsFieldChange(inputFieldValue: InputFieldValue): void {
    this.cost.numberOfMonths = inputFieldValue.value;
    this.isMonthsFieldValid = this.isFieldValid(inputFieldValue.status);
  }

  public addCost(): void {
    this.costsService.addCost(this.cost);
    this.clearFieldsValue();
    this.currentCosts = this.costsService.getCosts();
  }

  public deleteCost(cost: CostPosition): void {
    cost.isDeleted = true;
    this.costsService.deleteCost(cost);
    of(null).pipe(delay(0)).subscribe(() => {
      this.currentCosts = this.costsService.getCosts();
    });
  }

  public areCurrentCosts(): boolean {
    return this.costsService.getCosts().length > 0;
  }

  public isCostTypeWithCurrency(costsType: CostsType): boolean {
    return costsType === CostsType.FIXED_AMOUNT;
  }

  public areFieldsValuesValid(): boolean {
    return this.isValueFieldValid && this.isMonthsFieldValid;
  }

  public isCostDeleted(cost: CostPosition): boolean {
    return !!cost?.isDeleted;
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
    this.costsInputField.value = defaultCost;
    this.costsBalanceRateInputField.value = defaultCostPercentage;
    this.costsCreditRateInputField.value = defaultCostPercentage;
    this.cost.value = this.cost.type === CostsType.FIXED_AMOUNT ? defaultCost : defaultCostPercentage;
  }

  private clearMonths(): void {
    this.monthsInputField.value = 1;
    this.cost.numberOfMonths = 1;
  }

  private clearDate(): void {
    this.cost.date = moment(),
    this.datePicker.date = this.cost.date;
    this.datePicker = cloneDeep(this.datePicker);
  }
}
