import { Injectable } from '@angular/core';
import { TranchesService } from '../tranches/tranches.service';
import { DatePeriodIndexerService } from './date-period-indexer.service';
import { TrancheData, TranchePosition } from '../models/tranche.model';

@Injectable({
  providedIn: 'root'
})
export class TranchesDataService {
  private tranches: TranchePosition[] = [];
  private tranchesData: TrancheData[] = [];
  constructor(
    private tranchesService: TranchesService,
    private datePeriodIndexerService: DatePeriodIndexerService
  ) { }

  public calculateTranches(): void {
    this.tranches = this.tranchesService.getTranches();
    this.tranchesData = [];
    this.tranches.forEach((tranche: TranchePosition) => {
      this.tranchesData.push({
        ...tranche,
        ...this.datePeriodIndexerService.translateDateToIndexOfStartMonth(tranche.date)
      });
    });
  }

  public getTranchesValueByMonthsIndex(monthsIndex: number): number {
    const tranches = this.getTranchesByMonthsIndex(monthsIndex);
    return tranches.reduce((acc, tranche) => acc + tranche.value, 0)
  }

  public getTranchesByMonthsIndex(monthsIndex: number): TrancheData[] {
    return this.tranchesData.filter((tranche: TrancheData) => tranche.startMonth === monthsIndex);
  }

  public areTranches(): boolean {
    return this.tranchesData.length > 0;
  }
}
