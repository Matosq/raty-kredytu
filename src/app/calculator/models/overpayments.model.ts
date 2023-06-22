import { Moment } from "moment";

export interface Overpayment {
  value: number;
  date: Moment | null;
  numberOfMonths: number;
  type: OverpaymentsType;
}

export enum OverpaymentsType {
  LOAN_PERIOD_REDUCTION = 'skraca kredyt',
  INSTALLMENT_REDUCTION = 'zmniejsza ratę'
}