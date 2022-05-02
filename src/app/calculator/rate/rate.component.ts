import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import moment, { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { ButtonConfig } from 'src/app/shared/models/button-config.model';
import { IconName } from 'src/app/shared/models/icon-names.model';
import { Rate, RatePosition } from '../models/rate.model';
import { SectionCard, SectionCardHeader } from '../models/section-card.model';
import { RateService } from '../services/rate.service';
import { LoanParametersService } from '../services/loan-parameters.service';
import { RateParameters } from './rate-parameters';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateComponent extends RateParameters implements SectionCard, OnInit, OnDestroy {
  private currentLoanRateSubscription!: Subscription;
  private currentLoanRate!: number;
  private rate!: Rate;
  public rateChanges: RatePosition[] = [];
  public readonly cardHeader = SectionCardHeader.RATE;
  public addRateButton: ButtonConfig = {
    text: 'zmień oprocentowanie',
    icon: IconName.PERCENT
  }
  public deleteRateButton: ButtonConfig = {
    text: 'usuń',
    icon: IconName.DELETE
  }
  constructor(
    private loanParameters: LoanParametersService,
    private rateService: RateService) {
    super();
  }

  public ngOnInit(): void {
    this.initializeRateValues();
    this.subscribeToCurrentLoanRate();
  }

  public ngOnDestroy(): void {
    this.currentLoanRateSubscription.unsubscribe();
  }

  public onRateChange(value: number): void {
    this.rate.value = value;
  }

  public onDateChange(date: Moment): void {
    this.rate.date = date;
  }

  public onNumberOfMonthsChange(nbMonths: number): void {
    this.rate.numberOfMonths = nbMonths;
  }

  public areRateChanges(): boolean {
    return this.rateChanges.length > 0;
  }

  public addRate(): void {
    this.rateService.addRate(this.rate);
    this.resetFields();
    this.rateChanges = this.rateService.getRates();
  }

  public deleteRate(rate: RatePosition): void {
    this.rateService.deleteRate(rate);
    this.rateChanges = this.rateService.getRates();
  }

  private initializeRateValues(): void {
    this.rateInputField.value = this.loanParameters.getRate();
    this.rate = {
      value: this.rateInputField.value,
      date: moment(),
      numberOfMonths: 0
    }
  }

  private subscribeToCurrentLoanRate(): void {
    this.currentLoanRateSubscription = this.loanParameters.getRate$().subscribe((loanRate: number) => {
      this.currentLoanRate = loanRate;
    })
  }

  private resetFields(): void {
    this.datePicker.date = moment();
    this.monthsInputField.value = 0;
    this.rateInputField.value = this.currentLoanRate;
  }
}
