import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DonutChartData } from 'src/app/shared/donut-chart/donut-chart.component';

export interface SummaryCalculation {
  principals: number,
  interests: number,
  sumCosts: number,
  costs: Map<number, number>,
  overpayments: number
}

export interface Summary {
  chart: DonutChartData[]
  summary: SummaryCalculation
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
    this.calculateDonutChart('#1F172E', data.principals);
    this.calculateDonutChart('#FBEBDC', data.interests);
    this.calculateDonutChart('#FF9914', data.sumCosts);
    this.calculateDonutChart('#6C9E71', data.overpayments);

    this.summarySubject.next({summary: data, chart: this.donutChart});
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
