import { CreditParameterDatepicker, CreditParameterInputField } from "../models/credit-parameter.model";
import { Section } from "../section/section";

export class TranchesParameters extends Section {
  public datePickerField: CreditParameterDatepicker = {
    fieldTitle: { title: 'data transzy' },
    label: 'miesiąc i rok'
  }
  public newTranchePercentageInput: CreditParameterInputField = {
    fieldTitle: { title: 'wartość transzy' },
    label: '%',
    value: 10,
    stepValue: 5,
    validation: { min: 0, max: 100 }
  };
}
