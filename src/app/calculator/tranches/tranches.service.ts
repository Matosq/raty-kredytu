import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import moment, { Moment } from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tranche } from '../models/tranche.model';
import { CreditPeriod, LoanParametersService } from '../services/loan-parameters.service';


@Injectable({
  providedIn: 'root'
})
export class TranchesService {
  private dateRange!: CreditPeriod;
  private tranches: Tranche[] = [];
  private amountLoan: number = 0;
  private tranchesSubject = new BehaviorSubject<Tranche[]>(this.tranches);
  private trancheIndex = 2;
  constructor(
    private loanParams: LoanParametersService
  ) {
    this.initializeFirstTranche();
    this.subscribeToLoanParameters();
  }

  public addTranche(): void {
    this.tranches.push({
      date: cloneDeep(this.dateRange.startDate),
      percentage: 0,
      value: 0,
      trancheId: this.trancheIndex++
    });
    this.tranchesSubject.next(this.tranches);
  }

  public removeTranche(trancheId: number): void {
    this.tranches = this.tranches.filter((tranche: Tranche) => tranche.trancheId !== trancheId);
    this.tranchesSubject.next(this.tranches);
  }

  public getTranches$(): Observable<Tranche[]> {
    return this.tranchesSubject.asObservable();
  }

  public getAmountLoan(): number {
    return this.amountLoan;
  }

  public setTrancheValuesByTrancheId(percentage: number, id: number): void {
    const tranche = this.tranches.find((tranche: Tranche) => tranche.trancheId === id);
    if (!tranche) { return; }
    tranche.percentage = percentage;
    tranche.value = this.amountLoan * 0.01 * percentage;
  }

  public setTrancheDateByTrancheId(date: Moment, id: number): void {
    const tranche = this.tranches.find((tranche: Tranche) => tranche.trancheId === id);
    if (!tranche) { return; }
    tranche.date = date;
  }

  private subscribeToLoanParameters(): any {
    this.loanParams.getCreditPeriod$().subscribe(
      (creditPeriod: CreditPeriod) => {
        const firstTranche = this.tranches.find((tranche: Tranche) => tranche?.trancheId === 1);
        if (firstTranche) {
          firstTranche.date = creditPeriod.startDate;
        }
        this.dateRange = creditPeriod;
        this.tranchesSubject.next(this.tranches);
      }

    );

    this.loanParams.getAmountLoan$().subscribe(
      (value: number) => {
        this.amountLoan = value;
        this.tranches.forEach(
          (tranche: Tranche) => {
            tranche.value = this.amountLoan * 0.01 * tranche.percentage;
          }
        );
        this.tranchesSubject.next(this.tranches);  
      }
    );
    
  }

  private initializeFirstTranche(): void {
    this.tranches.push({
      trancheId: 1,
      date: moment(),
      value: 0,
      percentage: 100
    });
  }
} 
