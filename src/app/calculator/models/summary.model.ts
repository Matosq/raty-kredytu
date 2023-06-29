import { DonutChartData } from "src/app/shared/models/donut-chart-data.model";
import { Legend } from "./legend.model";

export interface SummaryCalculation {
  principals: number,
  interests: number,
  sumCosts: number,
  costs: Map<number, number>,
  overpayments: number,
  numberOfMonths: number
}

export interface Summary {
  chart: DonutChartData[],
  summary: SummaryCalculation,
  legends: Legend[];
}