import { Moment } from "moment";

export interface Overpayment {
  value: number;
  date: Moment | null;
  numberOfMonths: number;
}