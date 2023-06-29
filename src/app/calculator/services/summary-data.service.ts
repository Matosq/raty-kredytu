import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Legend, LegendColor } from '../models/legend.model';
import { Summary, SummaryCalculation } from '../models/summary.model';
import { DonutChartData } from 'src/app/shared/models/donut-chart-data.model';

@Injectable({
  providedIn: 'root'
})
export class SummaryDataService {
  private summarySubject = new BehaviorSubject<Summary | null>(null);
  private donutChart: DonutChartData[] = [];
  private sum = 0;

  public getSummaryData$(): Observable<Summary> {
    return this.summarySubject.asObservable() as Observable<Summary>;
  }

  public setSummaryData(data: SummaryCalculation): void {
    this.donutChart = [];
    this.sum = this.sumTotalCosts(data);
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

  public sumTotalCosts(data: SummaryCalculation): number {
    return data.sumCosts + data.principals + data.interests + data.overpayments;
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
