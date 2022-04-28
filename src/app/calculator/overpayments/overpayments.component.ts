import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import moment, { Moment } from 'moment';
import { delay, of } from 'rxjs';
import { CreditParameterDatepicker, CreditParameterInputField } from 'src/app/calculator/models/credit-parameter.model';
import { SectionCard, SectionCardHeader } from 'src/app/calculator/models/section-card.model';
import { fadeSlideInOutAnimation } from 'src/app/core/animations/fadeSlideIn';
import { ButtonConfig } from 'src/app/shared/models/button-config.model';
import { IconName } from 'src/app/shared/models/icon-names.model';
import { Overpayment } from '../models/overpayments.model';
import { OverpaymentPosition, OverpaymentsService } from './overpayments.service';

@Component({
  selector: 'app-overpayments',
  templateUrl: './overpayments.component.html',
  styleUrls: ['./overpayments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeSlideInOutAnimation]
})
export class OverpaymentsComponent implements SectionCard, OnInit {
  private overpayment: Overpayment = {
    value: 0,
    date: moment(),
    numberOfMonths: 0
  };
  public numberOfdeletedItems = 0;
  public currentOverpayments: OverpaymentPosition[] = [];
  public readonly cardHeader = SectionCardHeader.OVERPAYMENTS;
  public readonly overpaymentValueInputField: CreditParameterInputField = {
    fieldTitle: 'miesięczna wartość nadpłaty',
    label: 'zł',
    value: 0,
    stepValue: 100
  }
  public overpaymentDateField: CreditParameterDatepicker = {
    fieldTitle: 'data pierwszej nadpłaty',
    label: 'miesiąc i rok'
  }
  public readonly monthsInputField: CreditParameterInputField = {
    fieldTitle: 'okres nadpłacania',
    label: 'liczba miesięcy',
    value: 0,
    stepValue: 1
  }
  public readonly addOverpaymentButton: ButtonConfig = {
    text: 'dodaj nadpłatę',
    icon: IconName.ADD
  }
  public readonly deleteOverpaymentButton: ButtonConfig = {
    text: 'usuń',
    icon: IconName.DELETE
  }
  constructor(private overpaymentsService: OverpaymentsService) { }

  ngOnInit(): void {
  }

  public onValueChange(value: number): void {
    this.overpayment.value = value;
  }

  public onDateChange(date: Moment): void {
    this.overpayment.date = date;
  }

  public onNumberOfMonthsChange(value: number): void {
    this.overpayment.numberOfMonths = value;
  }

  public addOverpayment(): void {
    this.overpaymentsService.addOverpayment(this.overpayment);
    this.clearFields();
    this.currentOverpayments = this.overpaymentsService.getOverpayments();
    this.numberOfdeletedItems = 0;
  }

  public deleteOverpayment(overpayment: OverpaymentPosition): void {
    overpayment.isDeleted = true;
    this.overpaymentsService.deleteOverpayment(overpayment);
    of(null).pipe(delay(0)).subscribe(() => {
      this.currentOverpayments = this.overpaymentsService.getOverpayments();
      this.numberOfdeletedItems = 0;
    })
  }

  public getIndex(index: number): number {
    return index + 1 - this.numberOfdeletedItems;
  }

  public isOverpaymentDeleted(overpayment: OverpaymentPosition): boolean {
    const isDeleted = !!overpayment.isDeleted;
    if (isDeleted) {
      this.numberOfdeletedItems++;
    }
    return isDeleted;
  }

  public areCurrentOverpayments(): boolean {
    return this.overpaymentsService.getOverpayments().length > 0;
  }

  private clearFields(): void {
    this.overpayment.date = moment();
    this.overpayment.value = 0;
    this.overpayment.numberOfMonths = 0;
    this.overpaymentValueInputField.value = 0;
    this.monthsInputField.value = 0;
    this.overpaymentDateField.date = this.overpayment.date;
    this.overpaymentDateField = cloneDeep(this.overpaymentDateField);
  }
}
