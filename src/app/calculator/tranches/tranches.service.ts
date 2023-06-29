import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Tranche, TranchePosition } from '../models/tranche.model';
import { DatePeriodIndexerService } from '../services/date-period-indexer.service';
import { LoanParametersService } from '../services/loan-parameters.service';

@Injectable({
  providedIn: 'root'
})
export class TranchesService {
  private tranches: TranchePosition[] = [];
  private amountLoan = 0;
  private tranchesValueSubject = new Subject<boolean>();
  private trancheIndex = 2;
  constructor(
    private loanParams: LoanParametersService,
    private datePeriodIndexerService: DatePeriodIndexerService
  ) {
    this.subscribeToLoanParameters();
  }

  public addTranche(tranche: Tranche): void {
    this.tranches.unshift({
      ...tranche,
      ...{ trancheId: this.trancheIndex++ },
      ...this.datePeriodIndexerService.translateDateToMonthYearText(tranche.date)
    });
  }

  public deleteTranche(deletedTranche: TranchePosition): void {
    this.tranches = this.tranches.filter((tranche: Tranche) => tranche.trancheId !== deletedTranche.trancheId);
  }

  public getTranches(): TranchePosition[] {
    return this.tranches;
  }

  public getAmountLoan(): number {
    return this.amountLoan;
  }

  public getTranchesValue$(): Observable<boolean> {
    return this.tranchesValueSubject.asObservable();
  }

  private subscribeToLoanParameters(): void {
    this.loanParams.getAmountLoan$().subscribe(
      (value: number) => {
        this.amountLoan = value;
        this.tranches.forEach(
          (tranche: Tranche) => {
            tranche.value = this.amountLoan * 0.01 * tranche.percentage;
          }
        );
        this.tranchesValueSubject.next(true);
      }
    );
  }
} 
