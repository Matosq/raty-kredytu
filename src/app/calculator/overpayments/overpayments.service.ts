import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { MonthYearPeriod } from '../models/date.model';
import { Overpayment, OverpaymentPosition } from '../models/overpayments.model';
import { DatePeriodIndexerService } from '../services/date-period-indexer.service';

@Injectable({
  providedIn: 'root'
})
export class OverpaymentsService {
  private overpayments: OverpaymentPosition[] = [];
  private index = 0;
  constructor(private datePeriodIndexerService: DatePeriodIndexerService) { }

  public addOverpayment(overpayment: Overpayment): void {
    this.overpayments.unshift({
      ...overpayment,
      ...this.getMonthYearPeriodParsedAsString(overpayment.date as Moment, overpayment.numberOfMonths),
      indexOfOverpayment: this.index++
    });
  }

  public deleteOverpayment(overpayment: OverpaymentPosition): void {
    this.overpayments = this.overpayments.filter((o: OverpaymentPosition) => o.indexOfOverpayment !== overpayment.indexOfOverpayment)
  }

  public getOverpayments(): OverpaymentPosition[] {
    return this.overpayments
  }

  private getMonthYearPeriodParsedAsString(date: Moment, numberOfMonths: number): MonthYearPeriod {
    return this.datePeriodIndexerService.translateDateToMonthYearPeriods(date, numberOfMonths);
  }
}
