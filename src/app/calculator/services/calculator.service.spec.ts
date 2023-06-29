import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoanParametersService } from './loan-parameters.service';
import { SummaryCalculation, SummaryDataService } from './summary-data.service';
import { OverpaymentsDataService } from './overpayments-data.service';
import { CostsDataService } from './costs-data.service';
import { RatesDataService } from './rates-data.service';
import { TrancheData, TranchesDataService } from './tranches-data.service';
import { DatePeriodIndexerService } from './date-period-indexer.service';
import { SimulationDataService } from './simulation-data.service';
import moment from 'moment';

import { MonthCalculation } from '../models/month-calculation.model';
import { Installments } from 'src/app/calculator/models/installment.model';
import { take } from 'rxjs';


class SummaryDataServiceMock {
  public setSummaryData(data: SummaryCalculation): void { }
}

class OverpaymentsDataServiceMock {
  public calculateOverpayments() { }
  public getOverpaymentValueByMonthsIndex(): number { return 0; }
}

class TranchesDataServiceMock {
  public calculateTranches(): void { }
  public getTranchesByMonthsIndex(): TrancheData[] { return []; }
}

describe('CalculatorService', () => {
  let service: CalculatorService;
  let loanParametersService: LoanParametersService;
  let datePeriodIndexerService: DatePeriodIndexerService;
  let simulationDataService: SimulationDataService;
  let summaryDataServiceMock: SummaryDataService;
  let overpaymentsDataServiceMock: OverpaymentsDataService;
  let costsDataService: CostsDataService;
  let ratesDataService: RatesDataService;
  let tranchesDataServiceMock: TranchesDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoanParametersService,
        SimulationDataService,
        { provide: SummaryDataService, useClass: SummaryDataServiceMock },
        { provide: OverpaymentsDataService, useClass: OverpaymentsDataServiceMock },
        CostsDataService,
        RatesDataService,
        { provide: TranchesDataService, useClass: TranchesDataServiceMock },
        DatePeriodIndexerService
      ]
    });
    service = TestBed.inject(CalculatorService);
    loanParametersService = TestBed.inject(LoanParametersService);
    datePeriodIndexerService = TestBed.inject(DatePeriodIndexerService);
    simulationDataService = TestBed.inject(SimulationDataService);
    summaryDataServiceMock = TestBed.inject(SummaryDataService);
    overpaymentsDataServiceMock = TestBed.inject(OverpaymentsDataService);
    costsDataService = TestBed.inject(CostsDataService);
    ratesDataService = TestBed.inject(RatesDataService);
    tranchesDataServiceMock = TestBed.inject(TranchesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate simply loan', () => {
    const NUMBER_OF_MONTHS = 60;
    const RATE = 7.2;
    let simulationData: MonthCalculation[] = [];
    const date = moment();

    loanParametersService.setStartDate(date);
    loanParametersService.setFirstPaymentDate(date);
    loanParametersService.setAmountLoan(50000);
    loanParametersService.setInstallments(Installments.DEACRISING);
    loanParametersService.setNumberOfMonths(NUMBER_OF_MONTHS);
    loanParametersService.setRate(RATE);

    service.calculateLoan();

    simulationDataService.getSimulationData$().pipe(take(1)).subscribe((simulationData: MonthCalculation[]) => {
      const firstPayment = simulationData.find(d => d.index === 1);
      const lastPayment = simulationData.find(d => d.index === NUMBER_OF_MONTHS);

      expect(Math.floor(firstPayment!.principal)).toEqual(833);
      expect(Math.floor(firstPayment!.interest)).toEqual(295);
      expect(Math.floor(firstPayment!.installment)).toEqual(1129);
      expect(Math.floor(firstPayment!.saldo)).toEqual(49166);
      expect(Math.floor(firstPayment!.rate * 10000)).toEqual(RATE * 100);
      expect(Math.floor(firstPayment!.payment)).toEqual(1129);
      expect(firstPayment!.date).toMatch(date.locale('pl').format('MMM') + ' ' + date.year());

      expect(Math.floor(lastPayment!.principal)).toEqual(833);
      expect(Math.floor(lastPayment!.interest)).toEqual(5);
      expect(Math.floor(lastPayment!.installment)).toEqual(838);
      expect(Math.floor(lastPayment!.saldo + 1)).toEqual(0);
      expect(Math.floor(lastPayment!.rate * 10000)).toEqual(RATE * 100);
      expect(Math.floor(lastPayment!.payment)).toEqual(838);
      date.add(NUMBER_OF_MONTHS - 1, 'months');
      expect(lastPayment!.date).toMatch(date.locale('pl').format('MMM') + ' ' + date.year());
    }
    );

  });
});
