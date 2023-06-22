import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { MonthsPeriodIndexes } from '../models/date.model';
import { OverpaymentPosition, OverpaymentsService } from '../overpayments/overpayments.service';
import { DatePeriodIndexerService } from './date-period-indexer.service';
import { OverpaymentsType } from '../models/overpayments.model';

export type OverpaymentData = OverpaymentPosition & MonthsPeriodIndexes;

@Injectable({
  providedIn: 'root'
})
export class OverpaymentsDataService {
  private overpayments: OverpaymentPosition[] = [];
  private overpaymentsLoanReductionToMonthsMap: Map<number, number> = new Map();
  private overpaymentsInstallmentReductionToMonthsMap: Map<number, number> = new Map();
  constructor(
    private overpaymentsService: OverpaymentsService,
    private datePeriodIndexerService: DatePeriodIndexerService
  ) { }

  public getOverpaymentLoanReductionValueByMonthsIndex(monthsIndex: number): number {
    return this.overpaymentsLoanReductionToMonthsMap.get(monthsIndex) || 0;
  }

  public getOverpaymentInstallmentReductionValueByMonthsIndex(monthsIndex: number): number {
    return this.overpaymentsInstallmentReductionToMonthsMap.get(monthsIndex) || 0;
  }

  public calculateOverpayments(): void {
    this.overpayments = this.overpaymentsService.getOverpayments();
    this.overpaymentsLoanReductionToMonthsMap.clear();
    this.overpaymentsInstallmentReductionToMonthsMap.clear();
    this.calculateMonthsForOverpayments();
  }

  private calculateMonthsForOverpayments(): void {
    this.overpayments.forEach((overpayment: OverpaymentPosition) => {
      const { startMonth, endMonth } = this.datePeriodIndexerService.translateDateToIndexOfMonths(overpayment.date as Moment, overpayment.numberOfMonths)
      if (!!startMonth && !!endMonth) {
        for (let i = startMonth; i <= endMonth; i++) {
          this.setValuePerOverpaymentType(i, overpayment);
        }
      }
    });
  }

  private setValuePerOverpaymentType(month: number, overpayment: OverpaymentPosition): void {
    if (overpayment.type === OverpaymentsType.LOAN_PERIOD_REDUCTION) {
      this.setOverpaymentValueForMonth(month, overpayment, this.overpaymentsLoanReductionToMonthsMap);
      return;
    }
    this.setOverpaymentValueForMonth(month, overpayment, this.overpaymentsInstallmentReductionToMonthsMap);
  }

  private setOverpaymentValueForMonth(month: number, overpayment: OverpaymentPosition, overpaymentsToMonthsMap: Map<number, number>): void {
    const overpaymentForCurrentMonth = overpaymentsToMonthsMap.has(month) ?
      overpaymentsToMonthsMap.get(month) as number + overpayment.value : overpayment.value;
    overpaymentsToMonthsMap.set(month, overpaymentForCurrentMonth);
  }
}
