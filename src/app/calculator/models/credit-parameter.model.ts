import { EventEmitter, Input } from "@angular/core";
import { Moment } from "moment";
import { Installments } from "src/app/shared/button-toggle/installment.model";

export interface ParameterField {
    configuration: CreditParameterInputField | CreditParameterButtonTogle | CreditParameterDatepicker;
    valueChange: EventEmitter<any>;
}

export interface CreditParameterInputField {
    fieldTitle: string;
    label: string;
    value: number | Moment | null;
    stepValue: number | null;
    hint?: string;
    placeholder?: string;
}
  
export interface CreditParameterButtonTogle {
    fieldTitle: string;
    value: Installments;
    hint?: string;
}

export interface CreditParameterDatepicker {
    fieldTitle: string;
    label: string;
    hint?: string;
}
  