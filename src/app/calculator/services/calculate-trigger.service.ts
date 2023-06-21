import { Injectable } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Injectable({
  providedIn: 'root'
})
export class CalculateTriggerService {

  constructor(
    private calculatorService: CalculatorService
  ) { }

  public triggerLoanCalculation(): void {
    this.calculatorService.calculateLoan();
  }
}
