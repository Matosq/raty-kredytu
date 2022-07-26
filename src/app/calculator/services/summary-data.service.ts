import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DonutChartData } from 'src/app/shared/donut-chart/donut-chart.component';
import { Legend, LegendColor } from '../models/legend.model';

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
@Injectable({
  providedIn: 'root'
})
export class SummaryDataService {
  private summarySubject = new Subject<Summary>();
  private donutChart: DonutChartData[] = [];
  private sum = 0;
  constructor() { }

  public getSummaryData$(): Observable<Summary> {
    return this.summarySubject.asObservable() as Observable<Summary>;
  }

  public setSummaryData(data: SummaryCalculation): void {
    this.donutChart = [];
    this.sum = data.sumCosts + data.interests + data.principals + data.overpayments;
    this.calculateDonutChart(LegendColor.PRINCIPALS, data.principals);
    this.calculateDonutChart(LegendColor.INTERESTS, data.interests);
    this.calculateDonutChart(LegendColor.COSTS, data.sumCosts);
    this.calculateDonutChart(LegendColor.OVERPAYMENTS, data.overpayments);

    const legends: Legend[] = [
      { value: data.principals, name: 'kapitał', color: LegendColor.PRINCIPALS },
      { value: data.interests, name: 'odsetki', color: LegendColor.INTERESTS },
      { value: data.sumCosts, name: 'koszty dodatkowe', color: LegendColor.COSTS },
      { value: data.overpayments, name: 'nadpłaty', color: LegendColor.OVERPAYMENTS },
    ]
    this.summarySubject.next({ summary: data, chart: this.donutChart, legends: legends });
  }

  private calculateDonutChart(color: string, value: number): void {
    const valueWidth = Math.round((value / this.sum) * 360);
    if (valueWidth <= 0) { return; }
    if (valueWidth < 180) {
      this.pushElementToDonutChart(color, valueWidth);
      return;
    }
    this.pushElementToDonutChart(color, 180);
    this.pushElementToDonutChart(color, valueWidth - 180);
  }

  private pushElementToDonutChart(color: string, width: number): void {
    this.donutChart.push({
      color: color, width: width, rotate: this.donutChart.reduce((a, c) => a + c.width, 0)
    });
  }
}
