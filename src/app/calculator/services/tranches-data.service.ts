import { Injectable } from '@angular/core';
import { MonthsPeriodIndexes } from '../models/date.model';
import { TranchePosition, TranchesService } from '../tranches/tranches.service';
import { DatePeriodIndexerService } from './date-period-indexer.service';

export type TrancheData = TranchePosition & MonthsPeriodIndexes;
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
}
