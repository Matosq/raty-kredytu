import { Injectable } from '@angular/core';
import { MonthYearPeriod } from '../models/date.model';
import { Rate, RatePosition } from '../models/rate.model';
import { DatePeriodIndexerService } from '../services/date-period-indexer.service';


@Injectable({
  providedIn: 'root'
})
export class RateService {
  private rates: RatePosition[] = [];
  private index = 0;
  constructor(
    private datePeriodIndexerService: DatePeriodIndexerService
  ) { }

  public addRate(rate: Rate): void {
    this.rates.unshift({
      ...rate,
      ...this.getMonthsYearPeriodAsString(rate),
      indexOfRate: this.index++
    });
  }

  public deleteRate(rate: RatePosition): void {
    this.rates = this.rates.filter((r: RatePosition) => r.indexOfRate !== rate.indexOfRate);
  }

  public getRates(): RatePosition[] {
    return this.rates;
  }

  private getMonthsYearPeriodAsString(rate: Rate): MonthYearPeriod {
    return this.datePeriodIndexerService.translateDateToMonthYearPeriods(rate.date, rate.numberOfMonths);
  }
}