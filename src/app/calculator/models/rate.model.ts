import { Moment } from "moment";
import { MonthYearPeriod } from "./date.model";

export interface Rate {
  value: number,
  date: Moment,
  numberOfMonths: number
}

export type RatePosition = Rate & MonthYearPeriod & { indexOfRate: number, isDeleted?: boolean };