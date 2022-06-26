import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { CostPosition, CostsService } from '../costs/costs.service';
import { MonthsPeriodIndexes } from '../models/date.model';
import { DatePeriodIndexerService } from './date-period-indexer.service';


export type CostsData = CostPosition & MonthsPeriodIndexes;
@Injectable({
  providedIn: 'root'
})
export class CostsDataService {
  private costs: CostPosition[] = [];
  private costsData: CostsData[] = [];
  constructor(
    private costsService: CostsService,
    private datePeriodIndexerService: DatePeriodIndexerService
  ) { }


  public calculateCosts(): void {
    this.costs = this.costsService.getCosts();
    this.costs.forEach((cost: CostPosition) => {
      this.costsData.push({
        ...cost,
        ...this.datePeriodIndexerService.translateDateToIndexOfMonths(cost.date as Moment, cost.numberOfMonths),
      })
    });
    console.log(this.costsData);
  }
}
