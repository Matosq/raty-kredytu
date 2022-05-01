import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import moment from 'moment';
import { Moment } from 'moment';
import { Installments } from 'src/app/shared/button-toggle/installment.model';
import { ButtonConfig } from 'src/app/shared/models/button-config.model';
import { IconName } from 'src/app/shared/models/icon-names.model';
import { CreditParameterButtonTogle, CreditParameterDatepicker, CreditParameterInputField } from '../models/credit-parameter.model';
import { SectionCard, SectionCardHeader } from '../models/section-card.model';
import { CalculatorService } from '../services/calculator.service';
import { LoanParametersService } from '../services/loan-parameters.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoanComponent implements SectionCard, OnInit {
  public readonly cardHeader = SectionCardHeader.LOAN;

  public amountLoanField: CreditParameterInputField = {
    fieldTitle: 'kwota kredytu',
    label: 'zł',
    value: 300000,
    stepValue: 10000
  }

  public monthsOfCredit: CreditParameterInputField = {
    fieldTitle: 'okres kredytowania',
    label: 'liczba miesięcy',
    value: 300,
    stepValue: 1
  }

  public rate: CreditParameterInputField = {
    fieldTitle: 'oprocentowanie',
    label: '%',
    value: 5.12,
    stepValue: 0.1
  }

  public installments: CreditParameterButtonTogle = {
    fieldTitle: 'raty',
    value: Installments.EQUAL,
  }

  public startDate: CreditParameterDatepicker = {
    fieldTitle: 'rozpoczęcie kredytu',
    label: 'miesiąc i rok',
  }

  public firstPaymentDate: CreditParameterDatepicker = {
    fieldTitle: 'spłata pierwszej raty',
    label: 'miesiąc i rok',
  }

  public calculateButton: ButtonConfig = {
    text: 'oblicz raty',
    icon: IconName.CURRENCY_EXCHANGE
  }
  
  constructor(
    private loanParametersService: LoanParametersService,
    private calculatorService: CalculatorService
    ) { }

  ngOnInit(): void {
    this.loanParametersService.setAmountLoan(this.amountLoanField.value as number);
    this.loanParametersService.setNumberOfMonths(this.monthsOfCredit.value as number);
    this.loanParametersService.setRate(this.rate.value as number);
  }

  public onAmountLoan(value: number): void {
    console.log('onAmountLoan: ', value);
    this.loanParametersService.setAmountLoan(value);
  }

  public onMonthsOfCredit(value: number): void {
    console.log('onMonthsOfCredit: ', value);
    this.loanParametersService.setNumberOfMonths(value);
  }

  public onRate(value: number): void {
    console.log('onRate: ', value);
    this.loanParametersService.setRate(value);
  }

  public onInstallmentsButtonToggle(value: Installments): void {
    this.loanParametersService.setInstallments(value);
  }

  public onStartDate(value: Moment): void {
    this.loanParametersService.setStartDate(value);
    console.log('onStartDate: ', value);
  }

  public onFirstPayment(value: Moment): void {
    this.loanParametersService.setFirstPaymentDate(value);
    console.log('onFirstPayment: ', value);
  }

  public calculateLoan: () => void  = () => {
   this.calculatorService.calculateLoan();
  }
}
