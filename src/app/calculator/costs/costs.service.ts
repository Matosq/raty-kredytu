import { Injectable } from '@angular/core';
import { Cost } from '../models/costs.model';

export type Costposition = Cost & { indexOfCost: number };

@Injectable({
  providedIn: 'root'
})
export class CostsService {
  private costs: Costposition[] = [];
  private index = 0;
  constructor() { }

  public addCost(cost: Cost): void {
    this.costs.push({
      ...cost,
      indexOfCost: this.index++
    });
    console.log(cost);
  }

  public removeCostByIndex(index: number): void {
    this.costs = this.costs.filter((c: Costposition) => c.indexOfCost !== index);
  }

  public getCosts(): Costposition[] {
    return this.costs;
  }
}


