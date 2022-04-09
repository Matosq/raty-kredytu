import { Injectable } from '@angular/core';
import { Costposition, CostsService } from '../costs/costs.service';
import { MonthsPeriodIndexes } from '../models/date.model';
import { DatePeriodIndexerService } from './date-period-indexer.service';


export type CostsData = Costposition & MonthsPeriodIndexes;
@Injectable({
  providedIn: 'root'
})
export class CostsDataService {
  private costs: Costposition[] = [];
  private costsData: CostsData[] = [];
  constructor(private costsService: CostsService,
    private datePeriodIndexerService: DatePeriodIndexerService
  ) { }


  public calculateCosts(): void {
    this.costs = this.costsService.getCosts();
    console.log(this.costs);
    this.costs.forEach((cost: Costposition) => {
      this.costsData.push({
        ...cost,
        ...this.datePeriodIndexerService.translateDatePeriodToIndexOfMonths(cost.period),
      })
    })
    console.log(this.costsData);
  }
}
