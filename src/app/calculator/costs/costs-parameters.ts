import { CostsType } from "../models/costs.model"
import { CreditParameterDatepicker, CreditParameterInputField, CreditParameterSelectField, CreditParameterTextField } from "../models/credit-parameter.model"
import { Section } from "../section/section";

export const defaultCost = 100;
export const defaultCostPercentage = 0.1;
export class CostsParameters extends Section {
  public readonly costsNameTextField: CreditParameterTextField = {
    fieldTitle: { title: 'nazwa' },
    value: '',
    placeholder: 'np. ubezpieczenie'
  }

  public readonly selectField: CreditParameterSelectField = {
    fieldTitle: { title: 'rodzaj kosztu' },
    options: [
      { value: CostsType.FIXED_AMOUNT },
      { value: CostsType.BALANCE_RATE },
      { value: CostsType.CREDIT_AMOUNT_RATE }
    ],
    defaultValue: { value: CostsType.FIXED_AMOUNT },
  }

  public datePicker: CreditParameterDatepicker = {
    fieldTitle: { title: 'data pierwszej płatności' },
    label: 'miesiąc i rok'
  }

  public readonly monthsInputField: CreditParameterInputField = {
    fieldTitle: { title: 'okres trwania płatności' },
    label: 'liczba miesięcy',
    value: 1,
    stepValue: 1,
    validation: { min: 0, max: 1200, integerOnly: true }
  }

  public readonly costsInputField: CreditParameterInputField = {
    fieldTitle: { title: 'miesięczny koszt' },
    label: 'zł',
    value: defaultCost,
    stepValue: 100,
    validation: { min: 0, max: 100000000000 }
  }

  public readonly costsBalanceRateInputField: CreditParameterInputField = {
    fieldTitle: { title: 'oprocentowanie salda kredytu' },
    label: '%',
    value: defaultCostPercentage,
    stepValue: 0.1,
    validation: { min: 0, max: 100 }
  }

  public readonly costsCreditRateInputField: CreditParameterInputField = {
    fieldTitle: { title: 'oprocentowanie kwoty kredytu' },
    label: '%',
    value: defaultCostPercentage,
    stepValue: 0.1,
    validation: { min: 0, max: 100 }
  }
}
