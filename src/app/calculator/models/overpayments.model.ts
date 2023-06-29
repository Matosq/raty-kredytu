import { Moment } from "moment";
import { MonthYearPeriod } from "./date.model";

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

export type OverpaymentPosition = Overpayment & { indexOfOverpayment: number, isDeleted?: boolean } & MonthYearPeriod;
