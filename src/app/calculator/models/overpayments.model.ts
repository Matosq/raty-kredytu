import { Moment } from "moment";

export interface Overpayment {
  value: number;
  date: Moment | null;
  numberOfMonths: number;
}

export enum OverpaymentsType {
  LOAN_PERIOD_REDUCTION = 'skraca okres kredytowania',
  INSTALLMENT_REDUCTION = 'zmniejsza wysokosć raty'
}