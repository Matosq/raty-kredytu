import { Injectable } from '@angular/core';
import { Cost } from '../models/costs.model';

@Injectable({
  providedIn: 'root'
})
export class CostsService {

  constructor() { }

  public addCost(cost: Cost): void {
    console.log(cost);
  }
}


