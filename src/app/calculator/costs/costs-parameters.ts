import { CostsType } from "../models/costs.model"
import { CreditParameterDatepicker, CreditParameterInputField, CreditParameterSelectField, CreditParameterTextField } from "../models/credit-parameter.model"
import { Section } from "../section/section";

export const defaultCost = 100;
export const defaultCostPercentage = 0.1;
export class CostsParameters extends Section {
  public costsNameTextField: CreditParameterTextField = {
    fieldTitle: { title: 'nazwa' },
    value: '',
    placeholder: 'np. ubezpieczenie',
    id: 'costs-name-input'
  }

  public readonly selectField: CreditParameterSelectField = {
    fieldTitle: { title: 'rodzaj kosztu' },
    options: [
      { value: CostsType.FIXED_AMOUNT },
      { value: CostsType.BALANCE_RATE },
      { value: CostsType.CREDIT_AMOUNT_RATE }
    ],
    defaultValue: { value: CostsType.FIXED_AMOUNT }
  }

  public datePicker: CreditParameterDatepicker = {
    fieldTitle: { title: 'data pierwszej płatności' },
    label: 'miesiąc i rok'
  }

  public monthsInputField: CreditParameterInputField = {
    fieldTitle: { title: 'okres trwania płatności' },
    label: 'liczba miesięcy',
    value: 1,
    stepValue: 1,
    validation: { min: 0, max: 1200, integerOnly: true },
    id: 'costs-months-input'
  }

  public costsInputField: CreditParameterInputField = {
    fieldTitle: { title: 'miesięczny koszt' },
    label: 'zł',
    value: defaultCost,
    stepValue: 100,
    validation: { min: 0, max: 100000000000 }
  }

  public costsBalanceRateInputField: CreditParameterInputField = {
    fieldTitle: { title: 'oprocentowanie salda kredytu' },
    label: '%',
    value: defaultCostPercentage,
    stepValue: 0.1,
    validation: { min: 0, max: 100 },
    id: 'costs-balance-input'
  }

  public costsCreditRateInputField: CreditParameterInputField = {
    fieldTitle: { title: 'oprocentowanie kwoty kredytu' },
    label: '%',
    value: defaultCostPercentage,
    stepValue: 0.1,
    validation: { min: 0, max: 100 }
  }
}
