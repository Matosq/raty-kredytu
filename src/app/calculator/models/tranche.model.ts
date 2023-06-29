import { Moment } from "moment";
import { MonthYear, MonthsPeriodIndexes } from "./date.model";

export interface Tranche {
  date: Moment,
  percentage: number,
  value: number,
  trancheId?: number
}

export type TranchePosition = Tranche & MonthYear & { isDeleted?: boolean };

export type TrancheData = TranchePosition & MonthsPeriodIndexes;