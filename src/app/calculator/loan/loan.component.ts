import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Installments } from 'src/app/shared/button-toggle/installment.model';
import { InputFieldValue } from '../models/credit-parameter.model';
import { SectionCard, SectionCardHeader } from '../models/section-card.model';
import { LoanParametersService } from '../services/loan-parameters.service';
import { LoanParameters } from './loan-parameters';
import { CalculateTriggerService } from '../services/calculate-trigger.service';
import { getPeriodHintText } from '../utils/utils';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoanComponent extends LoanParameters implements SectionCard, OnInit {
  public readonly cardHeader = SectionCardHeader.LOAN;
  private isAmounLoanFieldValid = true;
  private isMonthsOfCreditFieldValid = true;
  private isRateFieldValid = true;

  constructor(
    private loanParametersService: LoanParametersService,
    private calculateTriggerService: CalculateTriggerService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.loanParametersService.setAmountLoan(this.amountLoanField.value as number);
    this.loanParametersService.setNumberOfMonths(this.monthsOfCredit.value as number);
    this.loanParametersService.setRate(this.rate.value as number);
  }

  public onAmountLoan(inputFieldValue: InputFieldValue): void {
    this.loanParametersService.setAmountLoan(inputFieldValue.value);
    this.isAmounLoanFieldValid = this.isFieldValid(inputFieldValue.status);
  }

  public onMonthsOfCredit(inputFieldValue: InputFieldValue): void {
    this.loanParametersService.setNumberOfMonths(inputFieldValue.value);
    this.isMonthsOfCreditFieldValid = this.isFieldValid(inputFieldValue.status);
    this.monthsOfCredit.hint = getPeriodHintText(inputFieldValue.value);
  }

  public onRate(inputFieldValue: InputFieldValue): void {
    this.loanParametersService.setRate(inputFieldValue.value);
    this.isRateFieldValid = this.isFieldValid(inputFieldValue.status);
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

  public calculateLoan: () => void = () => {
    this.calculateTriggerService.triggerLoanCalculation();
    this.scrollToSimulation();
  }

  public areParametersFieldsValid(): boolean {
    return this.isAmounLoanFieldValid && this.isMonthsOfCreditFieldValid && this.isRateFieldValid;
  }

  private scrollToSimulation(): void {
    const element = document.getElementById('simulation-card');
    element?.scrollIntoView({ behavior: "smooth" });
  }
}
