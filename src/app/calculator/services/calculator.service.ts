import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { Installments } from 'src/app/shared/button-toggle/installment.model';
import { LoanParametersService } from './loan-parameters.service';
import { cloneDeep } from 'lodash';
import { MonthCalculation } from '../models/month-calculation.model';
import { SimulationDataService } from './simulation-data.service';
import { OverpaymentsDataService } from './overpayments-data.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private monthCalculationDate!: Moment;
  constructor(
    private loanParams: LoanParametersService,
    private simulationData: SimulationDataService,
    private overpaymentsDataService: OverpaymentsDataService
  ) { }

  public calculateLoan(): void {
    this.monthCalculationDate = cloneDeep(this.loanParams.getCreditPeriod().startDate);
    if (this.loanParams.getInstallments() === Installments.EQUAL) {
      this.calculateEqualInstallments();
      return;
    }
    if (this.loanParams.getInstallments() === Installments.DEACRISING) {
      this.calculateDeacrisingInstallments();
      return;
    }
    console.warn('Rodzaj rat niewybrany');
  }


  private calculateEqualInstallments(): void {

    const rataStalaLicznik = this.loanParams.getAmountLoan() * this.loanParams.getRate();
    // const rataStalaMianownik = 12 * ( 1.0 - (12 / (12 + )))
    this.calculateDeacrisingInstallments();
  }

  private calculateDeacrisingInstallments(): void {

    this.overpaymentsDataService.calculateOverpayments();


    const calculation: MonthCalculation[]  = [];
    let currentSaldo = this.loanParams.getAmountLoan();
    let amountPrincipal = this.loanParams.getAmountLoan() / this.loanParams.getNumberOfMonths();
    let amountInterest = this.loanParams.getAmountLoan() * ((this.loanParams.getRate() * 0.01) / 12);

    let payment = amountPrincipal + amountInterest;
    const numberOfMonths = this.loanParams.getNumberOfMonths();

    
    for (let i = 1; i <= numberOfMonths; i++) {
      currentSaldo = currentSaldo - amountPrincipal

      const month: MonthCalculation = {
        index: i,
        date: this.getFormatedDate(),
        rate: this.loanParams.getRate() / 100,
        interest: amountInterest,
        principal: amountPrincipal,
        installment: amountPrincipal + amountInterest,
        extraCosts: 0,
        overpayments: 0,
        payment: amountPrincipal + amountInterest,
        saldo: currentSaldo,
      }
      calculation.push(month);
    }

    console.log(calculation);
    this.simulationData.setSimulationData(cloneDeep(calculation));
  }

  private getFormatedDate(): string {
    const date = this.monthCalculationDate.locale('pl').format('MMM') + ' ' + this.monthCalculationDate.year();
    this.monthCalculationDate.add(1, 'months');
    return date;
  }

}

