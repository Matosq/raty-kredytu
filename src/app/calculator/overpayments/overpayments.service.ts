import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { DateRange, MonthYearPeriod } from '../models/date.model';
import { Overpayment } from '../models/overpayments.model';
import { DatePeriodIndexerService } from '../services/date-period-indexer.service';

export type OverpaymentPosition = Overpayment & { indexOfOverpayment: number } & MonthYearPeriod;

@Injectable({
  providedIn: 'root'
})
export class OverpaymentsService {
  private overpayments: OverpaymentPosition[] = [];
  private index = 0;
  constructor(private datePeriodIndexerService: DatePeriodIndexerService) { }

  public addOverpayment(overpayment: Overpayment): void {
    this.overpayments.push({
      ...overpayment,
      ...this.getMonthYearPeriodParsedAsString(overpayment.period),
      indexOfOverpayment: this.index++
    });
  }

  public deleteOverpayment(overpayment: OverpaymentPosition): void {
    this.overpayments = this.overpayments.filter((o: OverpaymentPosition) => o.indexOfOverpayment !== overpayment.indexOfOverpayment)
  }

  public getOverpayments(): OverpaymentPosition[] {
    return this.overpayments
  }

  private getMonthYearPeriodParsedAsString(dateRange: DateRange): { monthYearPeriod: string, monthYearPeriodShortcut: string } {
    return this.datePeriodIndexerService.translateDatePeriodToMonthYearPeriods(dateRange);
  }
}
