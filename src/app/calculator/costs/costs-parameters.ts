import { CostsType } from "../models/costs.model"
import { CreditParameterDatepicker, CreditParameterInputField, CreditParameterSelectField, CreditParameterTextField } from "../models/credit-parameter.model"

export class CostsParameters {
  public readonly costsNameTextField: CreditParameterTextField = {
    fieldTitle: { title: 'nazwa'},
    value: '',
    placeholder: 'np. ubezpieczenie'
  }

  public readonly selectField: CreditParameterSelectField = {
    fieldTitle: { title: 'rodzaj kosztu'},
    options: [
      { value: CostsType.FIXED_AMOUNT },
      { value: CostsType.BALANCE_RATE },
      { value: CostsType.CREDIT_AMOUNT_RATE }
    ],
    defaultValue: { value: CostsType.FIXED_AMOUNT },
  }

  public datePicker: CreditParameterDatepicker = {
    fieldTitle: { title: 'data pierwszej płatności'},
    label: 'miesiąc i rok'
  }

  public readonly monthsInputField: CreditParameterInputField = {
    fieldTitle: { title: 'okres trwania płatności'},
    label: 'liczba miesięcy',
    value: 0,
    stepValue: 1
  }

  public readonly costsInputField: CreditParameterInputField = {
    fieldTitle: { title: 'miesięczny koszt'},
    label: 'zł',
    value: 0,
    stepValue: 100
  }

  public readonly costsBalanceRateInputField: CreditParameterInputField = {
    fieldTitle: { title: 'oprocentowanie salda kredytu'},
    label: '%',
    value: 0,
    stepValue: 0.1
  }

  public readonly costsCreditRateInputField: CreditParameterInputField = {
    fieldTitle: { title: 'oprocentowanie kwoty kredytu'},
    label: '%',
    value: 0,
    stepValue: 0.1
  }
}
