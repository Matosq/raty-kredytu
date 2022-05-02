import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Installments } from 'src/app/shared/button-toggle/installment.model';
import { SectionCard, SectionCardHeader } from '../models/section-card.model';
import { CalculatorService } from '../services/calculator.service';
import { LoanParametersService } from '../services/loan-parameters.service';
import { LoanParameters } from './loan-parameters';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoanComponent extends LoanParameters implements SectionCard, OnInit {
  public readonly cardHeader = SectionCardHeader.LOAN;

  constructor(
    private loanParametersService: LoanParametersService,
    private calculatorService: CalculatorService
    ) {
    super();
  }

  public ngOnInit(): void {
    this.loanParametersService.setAmountLoan(this.amountLoanField.value as number);
    this.loanParametersService.setNumberOfMonths(this.monthsOfCredit.value as number);
    this.loanParametersService.setRate(this.rate.value as number);
  }

  public onAmountLoan(value: number): void {
    this.loanParametersService.setAmountLoan(value);
  }

  public onMonthsOfCredit(value: number): void {
    this.loanParametersService.setNumberOfMonths(value);
  }

  public onRate(value: number): void {
    this.loanParametersService.setRate(value);
  }

  public onInstallmentsButtonToggle(value: Installments): void {
    this.loanParametersService.setInstallments(value);
  }

  public onStartDate(value: Moment): void {
    this.loanParametersService.setStartDate(value);
  }

  public onFirstPayment(value: Moment): void {
    this.loanParametersService.setFirstPaymentDate(value);
  }

  public calculateLoan: () => void  = () => {
   this.calculatorService.calculateLoan();
  }
}
