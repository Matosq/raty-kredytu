import { EventEmitter } from "@angular/core";
import { FormControlStatus } from "@angular/forms";
import { Moment } from "moment";
import { CostsOption } from "./costs.model";

export interface InputFieldValue {
  value: number,
  status: FormControlStatus
}
export interface ParameterField {
  configuration: CreditParameterInputField | CreditParameterButtonToggle<unknown> | CreditParameterDatepicker | CreditParameterTextField | CreditParameterSelectField;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueChange: EventEmitter<any>;
}

export interface FieldTitleConfig {
  title: string,
  tooltip?: string
}

export interface CreditParameterField {
  fieldTitle: FieldTitleConfig;
  hint?: string | number;
  isCurrencyHint?: boolean;
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

export interface Toggle<T> {
  value: T;
}

export interface CreditParameterButtonToggle<T> extends CreditParameterField {
  first: Toggle<T>;
  second: Toggle<T>;
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