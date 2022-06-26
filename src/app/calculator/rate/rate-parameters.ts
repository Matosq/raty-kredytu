import { CreditParameterDatepicker, CreditParameterInputField } from "../models/credit-parameter.model"
import { Section } from "../section/section"

export class RateParameters extends Section {
  public readonly rateInputField: CreditParameterInputField = {
    fieldTitle: { title: 'nowa wartość oprocentowania' },
    value: 0,
    stepValue: 0.1,
    label: '%',
    validation: { min: 0, max: 100 }
  }
  public datePickerField: CreditParameterDatepicker = {
    fieldTitle: { title: 'data zmiany' },
    label: 'miesiąc i rok'
  }
  public readonly monthsInputField: CreditParameterInputField = {
    fieldTitle: { title: 'okres zmiany oprocentowania' },
    value: 1,
    stepValue: 1,
    label: 'liczba miesięcy',
    validation: { min: 0, max: 1200, integerOnly: true }
  }
}
