import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { Installments } from 'src/app/shared/button-toggle/installment.model';
import { LoanParametersService } from './loan-parameters.service';
import { cloneDeep } from 'lodash';
import { MonthCalculation } from '../models/month-calculation.model';
import { SimulationDataService } from './simulation-data.service';
import { OverpaymentsDataService } from './overpayments-data.service';
import { CostsDataService } from './costs-data.service';
import { DatePeriodIndexerService } from './date-period-indexer.service';
import { RatesDataService } from './rates-data.service';
import { TrancheData, TranchesDataService } from './tranches-data.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private monthCalculationDate!: Moment;
  private calculation: MonthCalculation[] = [];
  constructor(
    private loanParams: LoanParametersService,
    private simulationData: SimulationDataService,
    private overpaymentsDataService: OverpaymentsDataService,
    private costsDataService: CostsDataService,
    private ratesDataService: RatesDataService,
    private tranchesDataService: TranchesDataService,
    private datePeriodIndexerService: DatePeriodIndexerService
  ) { }

  public calculateLoan(): void {
    this.datePeriodIndexerService.updateAbsoluteMonthsOfFirstDate();
    this.monthCalculationDate = cloneDeep(this.loanParams.getCreditPeriod().startDate);
    this.calculation = [];
    this.calculateParametersData();

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

  private calculateParametersData(): void {
    this.tranchesDataService.calculateTranches();
    this.costsDataService.calculateCosts();
    this.overpaymentsDataService.calculateOverpayments();
    this.ratesDataService.calculateRates();
  }

  private calculateEqualInstallments(): void {
    const deacrisingInstallmentNumerator = this.loanParams.getAmountLoan() * this.loanParams.getRate();
    // const rataStalaMianownik = 12 * ( 1.0 - (12 / (12 + )))
    this.calculateDeacrisingInstallments();
  }

  private calculateDeacrisingInstallments(): void {
    let currentSaldo = this.getPrimarySaldo();
    const basicRate = this.loanParams.getRate() * 0.01;


    const numberOfMonths = this.loanParams.getNumberOfMonths();
    let principal = this.loanParams.getAmountLoan() / numberOfMonths;
    
    for (let i = 1; i <= numberOfMonths; i++) {
      const tranches = this.getTranchesByMonthsIndex(i);
      const tranchesValue = this.sumTranchesValue(tranches);
      const currentOverpayment = this.overpaymentsDataService.getOverpaymentValueByMonthsIndex(i);
      currentSaldo = currentSaldo + tranchesValue - currentOverpayment;

      const currentRate = this.ratesDataService.getRateValueByMonthIndex(i) || basicRate;
      const interests = currentSaldo * (currentRate / 12);

      const costs = this.costsDataService.getCostsByMonthsIndex(i, currentSaldo, this.loanParams.getAmountLoan());

      currentSaldo = currentSaldo - principal;
      const sumCosts = costs.reduce((a, c) => a + c.costValue, 0);
     
      const month: MonthCalculation = {
        index: i,
        date: this.getFormatedDate(),
        rate: currentRate,
        interest: interests,
        principal: principal,
        installment: principal + interests + sumCosts + currentOverpayment,
        extraCosts: costs,
        sumExtraCosts: sumCosts,
        overpayments: currentOverpayment,
        payment: principal + interests + sumCosts + currentOverpayment,
        tranche: tranchesValue,
        saldo: currentSaldo,
      };
      this.calculation.push(month);
    }

    console.log(this.calculation);
  
    this.simulationData.setSimulationData(cloneDeep(this.calculation));
  }

  private getPrimarySaldo(): number {
    const saldo = this.sumTranchesValue(this.getTranchesByMonthsIndex(1));
    return saldo ? saldo : this.loanParams.getAmountLoan();
  }

  private sumTranchesValue(tranches: TrancheData[]): number {
    return tranches.reduce((acc, tranche) => acc + tranche.value, 0)
  }

  private getTranchesByMonthsIndex(monthsIndex: number): TrancheData[] {
    return this.tranchesDataService.getTranchesByMonthsIndex(monthsIndex);
  }

  private getFormatedDate(): string {
    const date = this.monthCalculationDate.locale('pl').format('MMM') + ' ' + this.monthCalculationDate.year();
    this.monthCalculationDate.add(1, 'months');
    return date;
  }

}

