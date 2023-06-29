import { TestBed } from '@angular/core/testing';
import cloneDeep from 'lodash/cloneDeep';
import moment, { Moment } from 'moment';
import { TranchesService } from '../tranches/tranches.service';
import { DatePeriodIndexerService } from './date-period-indexer.service';
import { LoanParametersService } from './loan-parameters.service';
import { TranchesDataService } from './tranches-data.service';
import { TranchePosition } from '../models/tranche.model';

const mockMoment = moment();
const mockTranchePosition: TranchePosition[] = [
  {
    date: mockMoment,
    monthYear: "czerwiec 2022",
    monthYearShortcut: "cze 2022",
    percentage: 5,
    trancheId: 1,
    value: 300
  },
  {
    date: mockMoment,
    monthYear: "czerwiec 2022",
    monthYearShortcut: "cze 2022",
    percentage: 10,
    trancheId: 2,
    value: 600
  },
  {
    date: cloneDeep(mockMoment).add(2, 'months'),
    monthYear: "czerwiec 2034",
    monthYearShortcut: "cze 2034",
    percentage: 15,
    trancheId: 3,
    value: 1500
  }
];

class MockTranchesService {
  public getTranches(): TranchePosition[] {
    return mockTranchePosition;
  }
}

class MockLoanParametersService {
  public getLoanStartDate(): Moment {
    return mockMoment;
  }
}
describe('TranchesDataService', () => {
  let tranchesDataService: TranchesDataService;
  let tranchesService: TranchesService;
  let loanParametersService: LoanParametersService;
  let datePeriodIndexerService: DatePeriodIndexerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TranchesService, useClass: MockTranchesService },
        { provide: LoanParametersService, useClass: MockLoanParametersService },
      ]
    });
    tranchesDataService = TestBed.inject(TranchesDataService);
    tranchesService = TestBed.inject(TranchesService);
    loanParametersService = TestBed.inject(LoanParametersService);
    datePeriodIndexerService = TestBed.inject(DatePeriodIndexerService);
  });

  it('should retrieve all tranches value by months index', () => {
    datePeriodIndexerService.updateAbsoluteMonthsOfFirstDate();
    tranchesDataService.calculateTranches();
    expect(tranchesDataService.getTranchesValueByMonthsIndex(1)).toEqual(900);
  });
});
