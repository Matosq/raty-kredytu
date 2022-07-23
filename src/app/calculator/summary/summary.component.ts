import { Component, OnDestroy, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Subscription } from 'rxjs';
import { DonutChartData } from 'src/app/shared/donut-chart/donut-chart.component';
import { SummaryDataService } from '../services/summary-data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {
  public chartBars: DonutChartData[] = [];
  private summarySubscription!: Subscription;
  constructor(
    private summaryDataService: SummaryDataService
  ) { }

  ngOnInit(): void {
    this.summarySubscription = this.summaryDataService.getSummaryData$().subscribe(
      summaryData => {
        console.log(summaryData);
        this.chartBars = cloneDeep(summaryData.chart);
      }
    );
  }

  public ngOnDestroy(): void {
    this.summarySubscription.unsubscribe();
  }

}
