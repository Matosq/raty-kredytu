import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DonutChartData } from 'src/app/shared/donut-chart/donut-chart.component';
import { Legend } from '../models/legend.model';
import { SectionCard, SectionCardHeader } from '../models/section-card.model';
import { LoanParametersService } from '../services/loan-parameters.service';
import { SummaryCalculation, SummaryDataService } from '../services/summary-data.service';
import { ButtonConfig } from 'src/app/shared/models/button-config.model';
import { IconName } from 'src/app/shared/models/icon-names.model';
import { ReportService } from '../services/report.service';
import { getInstallmentsAsText } from '../utils/utils';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements SectionCard, OnInit, OnDestroy {
  public readonly cardHeader = SectionCardHeader.SUMMARY;
  public chartBars: DonutChartData[] = [];
  public legends: Legend[] = [];
  public totalCost = 0;
  public installments = '';
  public loanPeriod = '';

  protected downloadReportButton: ButtonConfig = {
    text: 'Pobierz symulację kredytu',
    icon: IconName.DOWNLOAD
  }
  private summarySubscription!: Subscription;
  constructor(
    private summaryDataService: SummaryDataService,
    private loanParametersService: LoanParametersService,
    private reportService: ReportService,
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.summarySubscription = this.summaryDataService.getSummaryData$().subscribe(
      summaryData => {
        console.log(summaryData);
        this.legends = summaryData.legends;
        this.chartBars = summaryData.chart;
        this.takeTotalCostAndNumberOfMonths(summaryData.summary);
        this.takeLoanParameters();
        this.changeDetector.detectChanges();
      }
    );
    this.reportService.subscribeData();
  }

  public ngOnDestroy(): void {
    this.summarySubscription.unsubscribe();
    this.reportService.unsubscribe();
  }

  public downloadReport(): void {
    this.reportService.getReport();
  }

  private takeTotalCostAndNumberOfMonths(data: SummaryCalculation) {
    this.totalCost = this.summaryDataService.sumTotalCosts(data);
    if (data.numberOfMonths === 1) {
      this.loanPeriod = `1 miesiąc`;
      return;
    }
    const lastChar = `${data.numberOfMonths}`.slice(-1);
    const numerals = ['2', '3', '4'];
    this.loanPeriod = `${data.numberOfMonths} `;
    this.loanPeriod += numerals.includes(lastChar) ? 'miesiące' : 'miesięcy';
  }

  private takeLoanParameters(): void {
    this.installments = getInstallmentsAsText(this.loanParametersService.getInstallments());
  }

}
