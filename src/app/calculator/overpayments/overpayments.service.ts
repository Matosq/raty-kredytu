import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { MonthYearPeriod } from '../models/date.model';
import { Overpayment, OverpaymentsType } from '../models/overpayments.model';
import { DatePeriodIndexerService } from '../services/date-period-indexer.service';

export type OverpaymentPosition = Overpayment & { indexOfOverpayment: number, isDeleted?: boolean } & MonthYearPeriod;

@Injectable({
  providedIn: 'root'
})
export class OverpaymentsService {
  private overpayments: OverpaymentPosition[] = [];
  private index = 0;
  private overpaymentsType = OverpaymentsType.INSTALLMENT_REDUCTION;
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

  public setOverpaymentsType(value: OverpaymentsType): void {
    this.overpaymentsType = value;
  }

  public getOverpaymentsType(): OverpaymentsType {
    return this.overpaymentsType;
  }

  private getMonthYearPeriodParsedAsString(date: Moment, numberOfMonths: number): MonthYearPeriod {
    return this.datePeriodIndexerService.translateDateToMonthYearPeriods(date, numberOfMonths);
  }
}
