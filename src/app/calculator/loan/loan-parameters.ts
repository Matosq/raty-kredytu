import { Installments } from "src/app/shared/button-toggle/installment.model";
import { ButtonConfig } from "src/app/shared/models/button-config.model";
import { IconName } from "src/app/shared/models/icon-names.model";
import { CreditParameterButtonToggle, CreditParameterDatepicker, CreditParameterInputField } from "../models/credit-parameter.model";
import { Section } from "../section/section";

export class LoanParameters extends Section {
  public readonly amountLoanField: CreditParameterInputField = {
    fieldTitle: {
      title: 'kwota kredytu',
      tooltip: 'Całkowita kwota kredytu, to kwota, którą rzeczywiście otrzymamy od banku, na podstawie zawartej wcześniej umowy kredytowej.'
    },
    label: 'zł',
    placeholder: 'wpisz kwotę kredytu',
    value: 300000,
    stepValue: 10000,
    validation: { min: 0, max: 100000000000 }
  }

  public readonly monthsOfCredit: CreditParameterInputField = {
    fieldTitle: { title: 'okres kredytowania' },
    label: 'liczba miesięcy',
    value: 300,
    stepValue: 1,
    validation: { min: 0, max: 1200, integerOnly: true }
  }

  public readonly rate: CreditParameterInputField = {
    fieldTitle: { title: 'oprocentowanie' },
    label: '%',
    value: 5.12,
    stepValue: 0.1,
    validation: { min: 0, max: 100 }
  }

  public readonly installments: CreditParameterButtonToggle<Installments> = {
    fieldTitle: { title: 'raty' },
    first: { value: Installments.EQUAL },
    second: { value: Installments.DEACRISING }
  }

  public readonly startDate: CreditParameterDatepicker = {
    fieldTitle: { title: 'rozpoczęcie kredytu' },
    label: 'miesiąc i rok',
  }

  public readonly firstPaymentDate: CreditParameterDatepicker = {
    fieldTitle: { title: 'spłata pierwszej raty' },
    label: 'miesiąc i rok',
  }

  public readonly calculateButton: ButtonConfig = {
    text: 'oblicz raty',
    icon: IconName.CURRENCY_EXCHANGE
  }

  constructor() {
    super();
  }
}
