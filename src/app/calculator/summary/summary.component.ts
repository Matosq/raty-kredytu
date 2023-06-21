import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DonutChartData } from 'src/app/shared/donut-chart/donut-chart.component';
import { Legend } from '../models/legend.model';
import { SectionCard, SectionCardHeader } from '../models/section-card.model';
import { LoanParametersService } from '../services/loan-parameters.service';
import { Summary, SummaryCalculation, SummaryDataService } from '../services/summary-data.service';
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
  protected chartBars: DonutChartData[] = [];
  protected legends: Legend[] = [];
  protected totalCost = 0;
  protected installments = '';
  protected loanPeriod = '';
  protected isSummaryData = false;
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
        this.onSummaryDataChange(summaryData);
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

  private onSummaryDataChange(summary: Summary): void {
    this.isSummaryData = summary !== null && summary !== undefined;
    if (!this.isSummaryData) { return; }
    this.legends = summary.legends;
    this.chartBars = summary.chart;
    this.takeTotalCostAndNumberOfMonths(summary.summary);
    this.takeLoanParameters();
    this.changeDetector.detectChanges();
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
