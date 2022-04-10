import { EventEmitter } from "@angular/core";
import { Moment } from "moment";
import { Installments } from "src/app/shared/button-toggle/installment.model";
import { CostsOption } from "./costs.model";


export interface ParameterField {
    configuration: CreditParameterInputField | CreditParameterButtonTogle | CreditParameterDatepicker | CreditParameterTextField | CreditParameterSelectField;
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
    date?: Moment;
    hint?: string;
}

export interface CreditParameterTextField {
    fieldTitle: string;
    value: string;
    placeholder: string;
    hint?: string;
}

export interface CreditParameterSelectField {
    fieldTitle: string;
    options: CostsOption[];
    defaultValue: CostsOption;
    hint?: string;
}