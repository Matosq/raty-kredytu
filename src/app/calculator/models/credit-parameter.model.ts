import { EventEmitter } from "@angular/core";
import { FormControlStatus } from "@angular/forms";
import { Moment } from "moment";
import { Installments } from "src/app/shared/button-toggle/installment.model";
import { CostsOption } from "./costs.model";
import { OverpaymentsType } from "./overpayments.model";

export interface InputFieldValue {
  value: number,
  status: FormControlStatus
}
export interface ParameterField {
  configuration: CreditParameterInputField | CreditParameterButtonTogle | CreditParameterDatepicker | CreditParameterTextField | CreditParameterSelectField;
  valueChange: EventEmitter<any>;
}

export interface FieldTitleConfig {
  title: string,
  tooltip?: string
}

export interface CreditParameterField {
  fieldTitle: FieldTitleConfig;
  hint?: string | number;
}

export interface CreditParameterInputField extends CreditParameterField {
  label: string;
  value: number | Moment | null;
  stepValue: number | null;
  placeholder?: string;
  validation: {
    min: number,
    max: number,
    integerOnly?: boolean
  }
}

export interface CreditParameterButtonTogle extends CreditParameterField {
  value: Installments | OverpaymentsType;
}

export interface CreditParameterDatepicker extends CreditParameterField {
  label: string;
  date?: Moment;
}

export interface CreditParameterTextField extends CreditParameterField {
  value: string;
  placeholder: string;
}

export interface CreditParameterSelectField extends CreditParameterField {
  options: CostsOption[];
  defaultValue: CostsOption;
}