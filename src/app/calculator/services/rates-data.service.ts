import { Injectable } from '@angular/core';
import { MonthsPeriodIndexes } from '../models/date.model';
import { RatePosition } from '../models/rate.model';
import { RateService } from '../rate/rate.service';
import { DatePeriodIndexerService } from './date-period-indexer.service';

export type RateData = RatePosition & MonthsPeriodIndexes;
@Injectable({
  providedIn: 'root'
})
export class RatesDataService {
  private rates: RatePosition[] = [];
  private ratesData: RateData[] = [];
  constructor(
    private rateService: RateService,
    private datePeriodIndexerService: DatePeriodIndexerService
  ) { }

  public calculateRates(): void {
    this.rates = this.rateService.getRates();
    this.ratesData = [];
    this.rates.forEach((rate: RatePosition) =>{
      this.ratesData.push({
        ...rate,
        ...this.datePeriodIndexerService.translateDateToIndexOfMonths(rate.date, rate.numberOfMonths)
      });
    });
  }
}
