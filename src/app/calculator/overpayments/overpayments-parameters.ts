import { CreditParameterDatepicker, CreditParameterInputField } from "../models/credit-parameter.model"

export class OverpaymentsParameters {
  public readonly overpaymentValueInputField: CreditParameterInputField = {
    fieldTitle: { title: 'miesięczna wartość nadpłaty' },
    label: 'zł',
    value: 0,
    stepValue: 100
  }
  public overpaymentDateField: CreditParameterDatepicker = {
    fieldTitle: { title: 'data pierwszej nadpłaty' },
    label: 'miesiąc i rok'
  }
  public readonly monthsInputField: CreditParameterInputField = {
    fieldTitle: { title: 'okres nadpłacania' },
    label: 'liczba miesięcy',
    value: 0,
    stepValue: 1
  }
}
