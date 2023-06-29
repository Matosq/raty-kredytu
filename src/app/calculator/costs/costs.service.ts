import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { Cost, CostPosition } from '../models/costs.model';
import { DatePeriodIndexerService } from '../services/date-period-indexer.service';

@Injectable({
  providedIn: 'root'
})
export class CostsService {
  private costs: CostPosition[] = [];
  private index = 1;
  constructor(private datePeriodIndexerService: DatePeriodIndexerService) { }

  public addCost(cost: Cost): void {
    if (!cost.name) {
      cost.name = `koszt dodatkowy ${this.index + 1}`
    }
    this.costs.unshift({
      ...cost,
      ...this.datePeriodIndexerService.translateDateToMonthYearPeriods(cost.date as Moment, cost.numberOfMonths),
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
