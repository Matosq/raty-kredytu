import { Installments } from "src/app/shared/button-toggle/installment.model";
import { ButtonConfig } from "src/app/shared/models/button-config.model";
import { IconName } from "src/app/shared/models/icon-names.model";
import { CreditParameterButtonTogle, CreditParameterDatepicker, CreditParameterInputField } from "../models/credit-parameter.model";

export class LoanParameters {

  public readonly amountLoanField: CreditParameterInputField = {
    fieldTitle: 'kwota kredytu',
    label: 'zł',
    value: 300000,
    stepValue: 10000
  }

  public readonly monthsOfCredit: CreditParameterInputField = {
    fieldTitle: 'okres kredytowania',
    label: 'liczba miesięcy',
    value: 300,
    stepValue: 1
  }

  public readonly rate: CreditParameterInputField = {
    fieldTitle: 'oprocentowanie',
    label: '%',
    value: 5.12,
    stepValue: 0.1
  }

  public readonly installments: CreditParameterButtonTogle = {
    fieldTitle: 'raty',
    value: Installments.EQUAL,
  }

  public readonly startDate: CreditParameterDatepicker = {
    fieldTitle: 'rozpoczęcie kredytu',
    label: 'miesiąc i rok',
  }

  public readonly firstPaymentDate: CreditParameterDatepicker = {
    fieldTitle: 'spłata pierwszej raty',
    label: 'miesiąc i rok',
  }

  public readonly calculateButton: ButtonConfig = {
    text: 'oblicz raty',
    icon: IconName.CURRENCY_EXCHANGE
  }

}
