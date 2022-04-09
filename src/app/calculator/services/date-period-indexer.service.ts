import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { DateRange, MonthsPeriodIndexes } from '../models/date.model';
import { LoanParametersService } from './loan-parameters.service';

@Injectable({
  providedIn: 'root'
})
export class DatePeriodIndexerService {
  private absoluteMonthsOfFirstDate!: number;
  constructor(private loanParametersService: LoanParametersService) { }

  public updateAbsoluteMonthsOfFirstDate(): void {
    this.absoluteMonthsOfFirstDate = this.getAbsoluteMonths(this.loanParametersService.getFirstPaymentDate());
  }

  public translateDatePeriodToIndexOfMonths(dateRange: DateRange): MonthsPeriodIndexes {
    return {
      startMonth: 1 + this.getMonthsNumberBetweenFirstDate(dateRange.startDate as Moment),
      endMonth: 1 + this.getMonthsNumberBetweenFirstDate(dateRange.endDate as Moment),
    }
  }

  private getMonthsNumberBetweenFirstDate(startOverpaymentDate: Moment): number {
    const monthsBetween = this.getAbsoluteMonths(startOverpaymentDate) - this.absoluteMonthsOfFirstDate;
    if (monthsBetween < 0) { return 0; }
    return monthsBetween;
  }

  private getAbsoluteMonths(date: Moment): number {
    const months = Number(date.format('MM'));
    const years = Number(date.format('YYYY'));
    return months + (years * 12);
  }
}
