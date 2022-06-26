import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Moment } from 'moment';
import { DateRange, MonthsPeriodIndexes, MonthYear, MonthYearPeriod } from '../models/date.model';
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

  public translateDateToIndexOfMonths(date: Moment, numberOfMonths: number): MonthsPeriodIndexes {
    const endDate = cloneDeep(date);
    return {
      startMonth: 1 + this.getMonthsNumberBetweenFirstDate(date),
      endMonth: 1 + this.getMonthsNumberBetweenFirstDate(endDate.add(numberOfMonths, 'months')),
    }
  }

  public translateDatePeriodToMonthYearPeriods(dateRange: DateRange): MonthYearPeriod {
    const startYear = (dateRange.startDate as Moment)?.year();
    const endYear = (dateRange.endDate as Moment)?.year();
    const startDatePl = (dateRange.startDate as Moment)?.locale('pl');
    const endDatePl = (dateRange.endDate as Moment)?.locale('pl');
    return {
      monthYearPeriod: `${startDatePl.format('MMMM')} ${startYear} - ${endDatePl.format('MMMM')} ${endYear}`,
      monthYearPeriodShortcut: `${startDatePl.format('MMM')} ${startYear} - ${endDatePl.format('MMM')} ${endYear}`
    }
  }

  public translateDateToMonthYearPeriods(date: Moment, numberOfMonths: number): MonthYearPeriod {
    const startYear = date.year();
    const startDatePl = date.locale('pl');
    if (numberOfMonths === 1) {
      return {
        monthYearPeriod: `${startDatePl.format('MMMM')} ${startYear} (1)`,
        monthYearPeriodShortcut: `${startDatePl.format('MMM')} ${startYear} (1)`
      } 
    }
    const endDate = cloneDeep(date);
    endDate.add(numberOfMonths - 1, 'months');
    const endYear = endDate.year();
    const endDatePl = endDate.locale('pl');
    return {
      monthYearPeriod: `${startDatePl.format('MMMM')} ${startYear} - ${endDatePl.format('MMMM')} ${endYear} (${numberOfMonths})`,
      monthYearPeriodShortcut: `${startDatePl.format('MMM')} ${startYear} - ${endDatePl.format('MMM')} ${endYear} (${numberOfMonths})`
    }
  }

  public translateDateToMonthYearText(date: Moment): MonthYear {
    const year = (date as Moment)?.year();
    const datePl = (date as Moment)?.locale('pl');
    return {
      monthYear: `${datePl.format('MMMM')} ${year}`,
      monthYearShortcut: `${datePl.format('MMM')} ${year}`
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
