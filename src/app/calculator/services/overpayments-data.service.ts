import { Injectable } from '@angular/core';
import { Moment } from 'moment';
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
    this.overpaymentsData = [];
    this.calculateMonthsForOverpayments();
  }

  private calculateMonthsForOverpayments(): void {
    this.overpayments.forEach((overpayment: OverpaymentPosition) => {
      this.overpaymentsData.push({
        ...overpayment,
        ...this.datePeriodIndexerService.translateDateToIndexOfMonths(overpayment.date as Moment, overpayment.numberOfMonths)
      });
    });
  }
}
