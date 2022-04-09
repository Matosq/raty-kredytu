import { Component, OnInit } from '@angular/core';
import { CreditParameterDatepicker, CreditParameterInputField } from 'src/app/calculator/models/credit-parameter.model';
import { SectionCard, SectionCardHeader } from 'src/app/calculator/models/section-card.model';
import { ButtonConfig } from 'src/app/shared/models/button-config.model';
import { IconName } from 'src/app/shared/models/icon-names.model';
import { DateRange } from '../models/date.model';
import { Overpayment } from '../models/overpayments.model';
import { OverpaymentsService } from './overpayments.service';

@Component({
  selector: 'app-overpayments',
  templateUrl: './overpayments.component.html',
  styleUrls: ['./overpayments.component.scss']
})
export class OverpaymentsComponent implements SectionCard, OnInit {
  private overpayment: Overpayment = {
    value: 0,
    period: { startDate: null, endDate: null }
  };
  public readonly cardHeader = SectionCardHeader.OVERPAYMENTS;
  public readonly overpaymentValueInputField: CreditParameterInputField = {
    fieldTitle: 'miesięczna wartość nadpłaty',
    label: 'zł',
    value: 0,
    stepValue: 100
  }
  public readonly overpaymentPeriodDateField: CreditParameterDatepicker = {
    fieldTitle: 'okres nadpłacania',
    label: 'miesiąc/rok - miesiąc/rok'
  }
  public readonly addOverpaymentButton: ButtonConfig = {
    text: 'dodaj nadpłatę',
    icon: IconName.ADD
  }
  constructor(private overpaymentsService: OverpaymentsService) { }

  ngOnInit(): void {
  }

  public onValueChange(value: number): void {
    this.overpayment.value = value;
  }

  public onDateChange(dateRange: DateRange): void {
    this.overpayment.period = dateRange;
  }

  public addOverpayment(): void {
    this.overpaymentsService.addOverpayment(this.overpayment);
  }

}
