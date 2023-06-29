import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { CostsService } from '../costs/costs.service';
import { CostData, CostPosition, CostsType } from '../models/costs.model';
import { DatePeriodIndexerService } from './date-period-indexer.service';
@Injectable({
  providedIn: 'root'
})
export class CostsDataService {
  private costs: CostPosition[] = [];
  private costsToMonthsIndexMap: Map<number, CostData[]> = new Map();
  constructor(
    private costsService: CostsService,
    private datePeriodIndexerService: DatePeriodIndexerService
  ) { }

  public calculateCosts(): void {
    this.costs = this.costsService.getCosts();
    this.costsToMonthsIndexMap.clear();
    this.costs.forEach((cost: CostPosition) => {
      const { startMonth, endMonth } = this.datePeriodIndexerService.translateDateToIndexOfMonths(cost.date as Moment, cost.numberOfMonths)
      if (!!startMonth && !!endMonth) {
        for (let i = startMonth; i <= endMonth; i++) {
          const allCostsForMonth = this.costsToMonthsIndexMap.get(i);
          if (!!allCostsForMonth) {
            allCostsForMonth.push(cost);
          } else {
            this.costsToMonthsIndexMap.set(i, [cost])
          }
        }
      }
    });
  }

  public getCostsByMonthsIndex(monthsIndex: number, saldo: number, amountOfLoan: number): CostData[] {
    const costs = this.costsToMonthsIndexMap.get(monthsIndex);
    if (!costs) { return []; }

    return costs.map((cost: CostData) => {
      let value = 0;
      switch (cost.type) {
        case CostsType.FIXED_AMOUNT:
          value = cost.value;
          break;
        case CostsType.CREDIT_AMOUNT_RATE:
          value = Math.round((cost.value * 100000) * amountOfLoan) / 10000000;
          break;
        case CostsType.BALANCE_RATE:
          value = Math.round((cost.value * 100000) * saldo) / 10000000;
          break
        default:
          console.error('Niepoprawny typ kosztu dodatkowego.');
      }
      return {
        value: value,
        type: cost.type,
        name: cost.name,
        indexOfCost: cost.indexOfCost
      }
    });
  }
}
