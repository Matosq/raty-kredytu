import { CreditParameterButtonToggle, CreditParameterDatepicker, CreditParameterInputField } from "../models/credit-parameter.model"
import { OverpaymentsType } from "../models/overpayments.model";
import { Section } from "../section/section";

export const defaultOverpayment = 100;
export class OverpaymentsParameters extends Section {
  public readonly overpaymentValueInputField: CreditParameterInputField = {
    fieldTitle: { title: 'miesięczna wartość nadpłaty' },
    label: 'zł',
    value: defaultOverpayment,
    stepValue: 100,
    validation: { min: 0, max: 100000000000 }
  }
  public overpaymentDateField: CreditParameterDatepicker = {
    fieldTitle: { title: 'data pierwszej nadpłaty' },
    label: 'miesiąc i rok',
  }
  public readonly monthsInputField: CreditParameterInputField = {
    fieldTitle: { title: 'okres nadpłacania' },
    label: 'liczba miesięcy',
    value: 1,
    stepValue: 1,
    validation: { min: 0, max: 1200, integerOnly: true }
  }

  public readonly overpayments: CreditParameterButtonToggle<OverpaymentsType> = {
    fieldTitle: { title: 'nadpłata' },
    second: { value: OverpaymentsType.LOAN_PERIOD_REDUCTION },
    first: { value: OverpaymentsType.INSTALLMENT_REDUCTION },
  }
}
