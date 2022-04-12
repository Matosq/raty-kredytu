import { Injectable } from '@angular/core';
import { Cost } from '../models/costs.model';
import { MonthYearPeriod } from '../models/date.model';
import { DatePeriodIndexerService } from '../services/date-period-indexer.service';

export type CostPosition = Cost & MonthYearPeriod & { indexOfCost: number };

@Injectable({
  providedIn: 'root'
})
export class CostsService {
  private costs: CostPosition[] = [];
  private index = 0;
  constructor(private datePeriodIndexerService: DatePeriodIndexerService) { }

  public addCost(cost: Cost): void {
    if (!cost.name) {
      cost.name = `koszt dodatkowy ${this.index+1}`
    } 
    this.costs.push({
      ...cost,
      ...this.datePeriodIndexerService.translateDatePeriodToMonthYearPeriods(cost.period),
      indexOfCost: this.index++
    });
  }

  public deleteCost(cost: CostPosition): void {
    this.costs = this.costs.filter((c: CostPosition) => c.indexOfCost !== cost.indexOfCost);
  }

  public getCosts(): CostPosition[] {
    return this.costs;
  }
}


