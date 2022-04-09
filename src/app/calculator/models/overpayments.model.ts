import { DateRange } from "./date.model";

export interface Overpayment {
  value: number;
  period: DateRange
}