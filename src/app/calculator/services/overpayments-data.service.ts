import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { MonthsPeriodIndexes } from '../models/date.model';
import { OverpaymentPosition, OverpaymentsService } from '../overpayments/overpayments.service';
import { DatePeriodIndexerService } from './date-period-indexer.service';

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
  private overpaymentsToMonthsMap: Map<number, number> = new Map();
  constructor(private overpaymentsService: OverpaymentsService,
    private datePeriodIndexerService: DatePeriodIndexerService
  ) { }

  public calculateOverpayments(): void {
    this.overpayments = this.overpaymentsService.getOverpayments();
    this.overpaymentsToMonthsMap.clear();
    this.calculateMonthsForOverpayments();
  }

  private calculateMonthsForOverpayments(): void {
    this.overpayments.forEach((overpayment: OverpaymentPosition) => {
      const { startMonth, endMonth } = this.datePeriodIndexerService.translateDateToIndexOfMonths(overpayment.date as Moment, overpayment.numberOfMonths)
      if (!!startMonth && !!endMonth) {
        for (let i = startMonth; i <= endMonth; i++) {
          const overpaymentForCurrentMonth = this.overpaymentsToMonthsMap.has(i) ?
            this.overpaymentsToMonthsMap.get(i) as number + overpayment.value : overpayment.value;
          this.overpaymentsToMonthsMap.set(i, overpaymentForCurrentMonth);
        }
      }
    });
  }

  public getOverpaymentValueByMonthsIndex(monthsIndex: number): number {
    return this.overpaymentsToMonthsMap.get(monthsIndex) || 0;
  }
}
