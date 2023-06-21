import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import moment, { Moment } from 'moment';
import { delay, of, Subscription } from 'rxjs';
import { ButtonConfig, ButtonType } from 'src/app/shared/models/button-config.model';
import { IconName } from 'src/app/shared/models/icon-names.model';
import { Rate, RatePosition } from '../models/rate.model';
import { SectionCard, SectionCardHeader } from '../models/section-card.model';
import { RateService } from './rate.service';
import { LoanParametersService } from '../services/loan-parameters.service';
import { RateParameters } from './rate-parameters';
import { InputFieldValue } from '../models/credit-parameter.model';
import { fadeSlideInOutAnimation } from 'src/app/core/animations/fadeSlideIn';
import { cloneDeep } from 'lodash';
import { CalculateTriggerService } from '../services/calculate-trigger.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeSlideInOutAnimation]
})
export class RateComponent extends RateParameters implements SectionCard, OnInit, OnDestroy {
  private currentLoanRateSubscription!: Subscription;
  private currentLoanRate!: number;
  private rate!: Rate;
  private isRateFieldValid = true;
  private isNumberOfMonthsValid = true;
  public rateChanges: RatePosition[] = [];
  public readonly cardHeader = SectionCardHeader.RATE;
  public addRateButton: ButtonConfig = {
    text: 'zmień oprocentowanie',
    icon: IconName.PERCENT
  }
  public deleteRateButton: ButtonConfig = {
    text: 'usuń',
    icon: IconName.DELETE,
    type: ButtonType.SMALL
  }
  constructor(
    private loanParameters: LoanParametersService,
    private rateService: RateService,
    private calculateTriggerService: CalculateTriggerService) {
    super();
  }

  public ngOnInit(): void {
    this.initializeRateValues();
    this.subscribeToCurrentLoanRate();
  }

  public ngOnDestroy(): void {
    this.currentLoanRateSubscription.unsubscribe();
  }

  public onRateChange(inputFieldValue: InputFieldValue): void {
    this.rate.value = inputFieldValue.value;
    this.isRateFieldValid = this.isFieldValid(inputFieldValue.status);
  }

  public onDateChange(date: Moment): void {
    this.rate.date = date;
  }

  public onNumberOfMonthsChange(inputFieldValue: InputFieldValue): void {
    this.rate.numberOfMonths = inputFieldValue.value;
    this.isNumberOfMonthsValid = this.isFieldValid(inputFieldValue.status);
  }

  public areRateChanges(): boolean {
    return this.rateService.getRates().length > 0;
  }

  public addRate(): void {
    this.rateService.addRate(this.rate);
    this.resetFields();
    this.rateChanges = this.rateService.getRates();
    this.calculateLoan();
  }

  public deleteRate(rate: RatePosition): void {
    rate.isDeleted = true;
    this.rateService.deleteRate(rate);
    of(null).pipe(delay(0)).subscribe(() => {
      this.rateChanges = this.rateService.getRates();
    });
    this.calculateLoan();
  }

  public areFieldsValid(): boolean {
    return this.isNumberOfMonthsValid && this.isRateFieldValid;
  }

  public isRateDeleted(rate: RatePosition): boolean {
    return !!rate.isDeleted;
  }

  private initializeRateValues(): void {
    this.rateInputField.value = this.loanParameters.getRate();
    this.rate = {
      value: this.rateInputField.value,
      date: moment(),
      numberOfMonths: this.monthsInputField.value as number
    }
  }

  private subscribeToCurrentLoanRate(): void {
    this.currentLoanRateSubscription = this.loanParameters.getRate$().subscribe((loanRate: number) => {
      this.currentLoanRate = loanRate;
    })
  }

  private resetFields(): void {
    this.rate.date = moment();
    this.datePickerField = cloneDeep(this.datePickerField);
    this.datePickerField.date = this.rate.date;
    this.monthsInputField.value = 1;
    this.rate.numberOfMonths = this.monthsInputField.value;
    this.rateInputField.value = this.currentLoanRate;
  }

  private calculateLoan(): void {
    this.calculateTriggerService.triggerLoanCalculation();
  }
}
