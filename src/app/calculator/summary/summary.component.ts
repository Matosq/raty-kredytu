import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Installments } from 'src/app/shared/button-toggle/installment.model';
import { DonutChartData } from 'src/app/shared/donut-chart/donut-chart.component';
import { Legend } from '../models/legend.model';
import { SectionCard, SectionCardHeader } from '../models/section-card.model';
import { LoanParametersService } from '../services/loan-parameters.service';
import { Summary, SummaryCalculation, SummaryDataService } from '../services/summary-data.service';

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
  private summarySubscription!: Subscription;
  constructor(
    private summaryDataService: SummaryDataService,
    private loanParametersService: LoanParametersService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
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
  }

  public ngOnDestroy(): void {
    this.summarySubscription.unsubscribe();
  }

  private takeTotalCostAndNumberOfMonths(data: SummaryCalculation) {
    this.totalCost = data.sumCosts + data.principals + data.interests + data.overpayments;
    if (data.numberOfMonths === 1) { 
      this.loanPeriod = `1 miesiąc`;
      return;
    }
    const lastChar = `${data.numberOfMonths}`.slice(-1);
    const numerals = ['2', '3', '4'];
    this.loanPeriod = `${data.numberOfMonths} `;
    this.loanPeriod += numerals.includes(lastChar) ? 'miesiące': 'miesięcy';
  }

  private takeLoanParameters(): void {
    this.installments = this.loanParametersService.getInstallments() === Installments.DEACRISING ? 'raty malejące' : 'raty równe';

  }

}
