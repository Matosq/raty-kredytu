import { Injectable } from '@angular/core';
import { MonthsPeriodIndexes } from '../models/date.model';
import { OverpaymentPosition, OverpaymentsService } from '../overpayments/overpayments.service';
import { DatePeriodIndexerService } from './date-period-indexer.service';
import { LoanParametersService } from './loan-parameters.service';

export type OverpaymentData = OverpaymentPosition & MonthsPeriodIndexes;

export interface SumOfOverpaymentsData {
  value: number,
  index: number
};

@Injectable({
  providedIn: 'root'
})
export class OverpaymentsDataService {
  private overpayments: OverpaymentPosition[] = [];
  private overpaymentsData: OverpaymentData[] = [];
  private sumOfOverpaymentsData: SumOfOverpaymentsData[] = [];
  constructor(private overpaymentsService: OverpaymentsService,
    private loanParametersService: LoanParametersService,
    private datePeriodIndexerService: DatePeriodIndexerService
  ) { }

  public calculateOverpayments(): void {
    this.overpayments = this.overpaymentsService.getOverpayments();
    this.calculateMonthsForOverpayments();
    this.sumOfOverpayments();
  }

  private calculateMonthsForOverpayments(): void {
    this.overpayments.forEach((overpayment: OverpaymentPosition) => {
      this.overpaymentsData.push({
        ...overpayment,
        ...this.datePeriodIndexerService.translateDatePeriodToIndexOfMonths(overpayment.period)
      });
    })
  }

  private sumOfOverpayments(): void {
    const numberOfMonths = this.loanParametersService.getNumberOfMonths();
    this.sumOfOverpaymentsData = [];
    console.log(this.overpaymentsData);
    for (let i = 1; i <= numberOfMonths; i++) {
      let value = 0;
      this.overpaymentsData.forEach((overpayment: OverpaymentData) => {
        if (i >= overpayment.startMonth && i <= overpayment.endMonth) {
          value += overpayment.value;
        }
      });
      this.sumOfOverpaymentsData.push({
        value: value,
        index: i
      });
    }
    console.log(this.sumOfOverpaymentsData);
  }
}
