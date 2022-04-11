import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { DateRange, MonthYearPeriod } from '../models/date.model';
import { Overpayment } from '../models/overpayments.model';

export type OverpaymentPosition = Overpayment & { indexOfOverpayment: number } & MonthYearPeriod;

@Injectable({
  providedIn: 'root'
})
export class OverpaymentsService {
  private overpayments: OverpaymentPosition[] = [];
  private index = 0;
  constructor() { }

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
    const startYear = (dateRange.startDate as Moment)?.year();
    const endYear = (dateRange.endDate as Moment)?.year();
    const startDatePl = (dateRange.startDate as Moment)?.locale('pl');
    const endDatePl = (dateRange.endDate as Moment)?.locale('pl');
    const startDate = (dateRange.startDate as Moment)?.locale('pl').format('MMMM') + ' ' + (dateRange.startDate as Moment)?.year();
    const endDate = (dateRange.endDate as Moment)?.locale('pl').format('MMMM') + ' ' + (dateRange.endDate as Moment)?.year();
    return {
      monthYearPeriod: `${startDatePl.format('MMMM')} ${startYear} - ${endDatePl.format('MMMM')} ${endYear}`,
      monthYearPeriodShortcut: `${startDatePl.format('MMM')} ${startYear} - ${endDatePl.format('MMM')} ${endYear}`
    }
  }
}
