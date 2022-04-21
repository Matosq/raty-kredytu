import { Moment } from "moment";

export interface CostsOption {
  value: CostsType;
}

export enum CostsType {
  FIXED_AMOUNT = 'stała kwota',
  BALANCE_RATE = 'opr. salda kredytu',
  CREDIT_AMOUNT_RATE = 'opr. całkowita kwota kredytu'
}

export interface Cost {
  name: string,
  date: Moment | null,
  numberOfMonths: number,
  type: CostsType,
  value: number
}