import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { Installments } from 'src/app/shared/button-toggle/installment.model';
import { LoanParametersService } from './loan-parameters.service';
import { cloneDeep } from 'lodash';
import { MonthCalculation } from '../models/month-calculation.model';
import { SimulationDataService } from './simulation-data.service';
import { OverpaymentsDataService } from './overpayments-data.service';
import { CostData, CostsDataService } from './costs-data.service';
import { DatePeriodIndexerService } from './date-period-indexer.service';
import { RatesDataService } from './rates-data.service';
import { TrancheData, TranchesDataService } from './tranches-data.service';
import { SummaryCalculation, SummaryDataService } from './summary-data.service';
import { INSTALLMENTS_IN_YEAR } from '../models/consts.model';
import { round } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private monthCalculationDate!: Moment;
  private numberOfMonths = 0;
  private numberOfMonthsForInstallmentsCalculation = 0;
  private currentDebt = 0;
  private currentDebtForInstallmentsCalculation = 0;
  private calculation: MonthCalculation[] = [];
  private summary: SummaryCalculation = {
    numberOfMonths: 0, principals: 0, interests: 0, sumCosts: 0, overpayments: 0, costs: new Map<number, number>()
  };
  constructor(
    private loanParams: LoanParametersService,
    private simulationData: SimulationDataService,
    private summaryDataService: SummaryDataService,
    private overpaymentsDataService: OverpaymentsDataService,
    private costsDataService: CostsDataService,
    private ratesDataService: RatesDataService,
    private tranchesDataService: TranchesDataService,
    private datePeriodIndexerService: DatePeriodIndexerService
  ) { }

  public calculateLoan(): void {
    this.cleanSummary();
    this.datePeriodIndexerService.updateAbsoluteMonthsOfFirstDate();
    this.monthCalculationDate = cloneDeep(this.loanParams.getCreditPeriod().startDate);
    this.calculation = [];
    this.calculateParametersData();
    this.numberOfMonths = this.loanParams.getNumberOfMonths();
    this.currentDebt = this.loanParams.getAmountLoan();
    this.numberOfMonthsForInstallmentsCalculation = this.numberOfMonths;
    this.currentDebtForInstallmentsCalculation = this.currentDebt;
    this.calculateInstallments();
  }

  private cleanSummary(): void {
    this.summary.sumCosts = 0;
    this.summary.principals = 0;
    this.summary.interests = 0;
    this.summary.overpayments = 0;
    this.summary.costs.clear();
  }

  private calculateParametersData(): void {
    this.tranchesDataService.calculateTranches();
    this.costsDataService.calculateCosts();
    this.overpaymentsDataService.calculateOverpayments();
    this.ratesDataService.calculateRates();
  }

  private calculateInstallments(): void {
    let currentSaldo = this.getPrimarySaldo();

    for (let monthIndex = 1; monthIndex <= this.numberOfMonths; monthIndex++) {
      const tranchesValue = this.sumTranchesValue(monthIndex);
      const overpaymentLoanReduction = this.overpaymentsDataService.getOverpaymentLoanReductionValueByMonthsIndex(monthIndex);
      const overpaymentInstallmentReduction = this.overpaymentsDataService.getOverpaymentInstallmentReductionValueByMonthsIndex(monthIndex);
      const currentOverpayment = overpaymentLoanReduction + overpaymentInstallmentReduction;

      this.currentDebt = this.currentDebt - currentOverpayment;
      currentSaldo = currentSaldo + tranchesValue;

      if (overpaymentInstallmentReduction > 0) {
        this.numberOfMonthsForInstallmentsCalculation = this.numberOfMonths - monthIndex + 1;
        this.currentDebtForInstallmentsCalculation = currentSaldo - overpaymentInstallmentReduction;
      }
      currentSaldo = currentSaldo - currentOverpayment;

      const currentRate = this.ratesDataService.getRateValueByMonthIndex(monthIndex);
      const interests = this.calculateInterests(currentSaldo, currentRate);
      const principal = this.calculatePrincipal(currentRate, interests, monthIndex);
      const costs = this.getCosts(monthIndex, currentSaldo);

      currentSaldo = currentSaldo - principal;
      const sumCosts = this.getSumOfCosts(costs);

      const month: MonthCalculation = {
        index: monthIndex,
        date: this.getFormatedDate(),
        rate: currentRate,
        interest: interests,
        principal: principal,
        installment: principal + interests,
        extraCosts: costs,
        sumExtraCosts: sumCosts,
        overpayments: currentOverpayment,
        payment: principal + interests + sumCosts + currentOverpayment,
        tranche: tranchesValue,
        saldo: currentSaldo,
      };
      this.calculation.push(month);
      this.updateSummary(month);
      if (round(currentSaldo) <= 0) { break; }
    }
    console.log(this.calculation);
    this.setCalculationResult();
  }

  private getPrimarySaldo(): number {
    const saldo = this.sumTranchesValue(1);
    return saldo ? saldo : this.loanParams.getAmountLoan();
  }

  private calculatePrincipalForDecreasingInstallemnts(): number {
    return this.currentDebtForInstallmentsCalculation / this.numberOfMonthsForInstallmentsCalculation;
  }

  private sumTranchesValue(monthsIndex: number): number {
    const tranches = this.getTranchesByMonthsIndex(monthsIndex);
    return tranches.reduce((acc, tranche) => acc + tranche.value, 0)
  }

  private getTranchesByMonthsIndex(monthsIndex: number): TrancheData[] {
    return this.tranchesDataService.getTranchesByMonthsIndex(monthsIndex);
  }

  private calculateInterests(saldo: number, rate: number): number {
    const daysInYear = this.monthCalculationDate.isLeapYear() ? 366 : 365;
    return saldo * rate * (this.monthCalculationDate.daysInMonth() / daysInYear);
  }

  private calculateEqualInstallment(rate: number): number {
    // nR = wysokosc_kredytu * oprocentowanie_kredytu
    const nR = this.currentDebtForInstallmentsCalculation * rate;

    // kR = liczba_rat_w_roku / (liczba_rat_w_roku + oprocentowanie_kredytu)
    const kR = INSTALLMENTS_IN_YEAR / (INSTALLMENTS_IN_YEAR + rate);

    // rata = nR / [ liczba_rat_w_roku * ( 1 - ([ kR ]^liczba_rat ) ]
    return nR / (INSTALLMENTS_IN_YEAR * (1 - (Math.pow(kR, this.numberOfMonthsForInstallmentsCalculation))));
  }

  private calculatePrincipal(rate: number, interests: number, monthIndex: number): number {
    let principal = 0;
    if (this.loanParams.getInstallments() === Installments.EQUAL) {
      const installment = this.calculateEqualInstallment(rate);
      principal = installment - interests;
    } else {
      principal = this.calculatePrincipalForDecreasingInstallemnts();
    }
    principal = this.equalizeLastInstallment(principal, monthIndex);
    return principal;
  }

  private equalizeLastInstallment(principal: number, monthIndex: number): number {
    const calculatedPrincipals = this.summary.principals + principal;
    if (!this.isLastInstallment(monthIndex, calculatedPrincipals)) {
      return principal;
    }
    const lastInstallmentEqualization = Math.abs(calculatedPrincipals - this.currentDebt);
    if (calculatedPrincipals > this.currentDebt) {
      return principal - lastInstallmentEqualization;
    }
    return principal + lastInstallmentEqualization;
  }

  private isLastInstallment(monthIndex: number, calculatedPrincipals: number): boolean {
    return (monthIndex === this.numberOfMonths) || (calculatedPrincipals > this.currentDebt);
  }

  private getCosts(monthsIndex: number, saldo: number): CostData[] {
    return this.costsDataService.getCostsByMonthsIndex(monthsIndex, saldo, this.loanParams.getAmountLoan());
  }

  private getFormatedDate(): string {
    const date = this.monthCalculationDate.locale('pl').format('MMM') + ' ' + this.monthCalculationDate.year();
    this.monthCalculationDate.add(1, 'months');
    return date;
  }

  private getSumOfCosts(costs: CostData[]): number {
    return costs.reduce((a, c) => a + c.value, 0);
  }

  private updateSummary(monthCalc: MonthCalculation): void {
    this.summary.sumCosts += monthCalc.sumExtraCosts;
    this.summary.principals += monthCalc.principal;
    this.summary.interests += monthCalc.interest;
    this.summary.overpayments += monthCalc.overpayments;
    monthCalc.extraCosts.forEach((cost: CostData) => {
      const calcCost = this.summary.costs.has(cost.indexOfCost) ? Number(this.summary.costs.get(cost.indexOfCost)) + cost.value : cost.value;
      this.summary.costs.set(cost.indexOfCost, calcCost);
    });
  }

  private setCalculationResult(): void {
    this.updateNumberOfMonthsInSummary();
    this.summaryDataService.setSummaryData(cloneDeep(this.summary));
    this.simulationData.setSimulationData(cloneDeep(this.calculation));
  }

  private updateNumberOfMonthsInSummary(): void {
    this.summary.numberOfMonths = this.calculation.length;
  }
}
