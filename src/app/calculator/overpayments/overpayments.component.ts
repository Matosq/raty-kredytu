import { ChangeDetectionStrategy, Component } from '@angular/core';
import { cloneDeep } from 'lodash';
import moment, { Moment } from 'moment';
import { delay, of } from 'rxjs';
import { SectionCard, SectionCardHeader } from 'src/app/calculator/models/section-card.model';
import { fadeSlideInOutAnimation } from 'src/app/core/animations/fadeSlideIn';
import { ButtonConfig } from 'src/app/shared/models/button-config.model';
import { IconName } from 'src/app/shared/models/icon-names.model';
import { InputFieldValue } from '../models/credit-parameter.model';
import { Overpayment } from '../models/overpayments.model';
import { defaultOverpayment, OverpaymentsParameters } from './overpayments-parameters';
import { OverpaymentPosition, OverpaymentsService } from './overpayments.service';

@Component({
  selector: 'app-overpayments',
  templateUrl: './overpayments.component.html',
  styleUrls: ['./overpayments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeSlideInOutAnimation]
})
export class OverpaymentsComponent extends OverpaymentsParameters implements SectionCard {
  private overpayment: Overpayment = {
    value: defaultOverpayment,
    date: moment(),
    numberOfMonths: 1
  };
  public numberOfdeletedItems = 0;
  public currentOverpayments: OverpaymentPosition[] = [];
  public readonly cardHeader = SectionCardHeader.OVERPAYMENTS;
  public readonly addOverpaymentButton: ButtonConfig = {
    text: 'dodaj nadpłatę',
    icon: IconName.ADD
  }
  public readonly deleteOverpaymentButton: ButtonConfig = {
    text: 'usuń',
    icon: IconName.DELETE
  }
  constructor(private overpaymentsService: OverpaymentsService) {
    super();
  }

  public onValueChange(inputFieldValue: InputFieldValue): void {
    this.overpayment.value = inputFieldValue.value;
  }

  public onDateChange(date: Moment): void {
    this.overpayment.date = date;
  }

  public onNumberOfMonthsChange(inputFieldValue: InputFieldValue): void {
    this.overpayment.numberOfMonths = inputFieldValue.value;
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
    this.overpayment.value = defaultOverpayment;
    this.overpayment.numberOfMonths = 1;
    this.overpaymentValueInputField.value = defaultOverpayment;
    this.monthsInputField.value = 1;
    this.overpaymentDateField.date = this.overpayment.date;
    this.overpaymentDateField = cloneDeep(this.overpaymentDateField);
  }
}
