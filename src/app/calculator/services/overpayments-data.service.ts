import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { Overpayment } from '../models/overpayments.model';
import { OverpaymentPosition, OverpaymentsService } from '../overpayments/overpayments.service';
import { LoanParametersService } from './loan-parameters.service';

export interface OverpaymentData {
  startMonth: number;
  endMonth: number;
  value: number
};

export interface SumOfOverpaymentsData {
  value: number,
  index: number
};

@Injectable({
  providedIn: 'root'
})
export class OverpaymentsDataService {
  private absoluteMonthsOfFirstDate!: number;
  private overpayments: OverpaymentPosition[] = [];
  private overpaymentsData: OverpaymentData[] = [];
  private sumOfOverpaymentsData: SumOfOverpaymentsData[] = [];
  constructor(private overpaymentsService: OverpaymentsService,
    private loanParametersService: LoanParametersService
  ) { }

  public calculateOverpayments(): void {
    this.absoluteMonthsOfFirstDate = this.getAbsoluteMonths(this.loanParametersService.getFirstPaymentDate());
    this.overpayments = this.overpaymentsService.getOverpayments();
    this.calculateMonthsForOverpayments();
    this.sumOfOverpayments();
  }

  private calculateMonthsForOverpayments(): void {
    this.overpayments.forEach((overpayment: Overpayment) => {
      this.overpaymentsData.push({
        startMonth: 1 + this.getMonthsNumberBetweenFirstDate(overpayment.period.startDate as Moment),
        endMonth: 1 + this.getMonthsNumberBetweenFirstDate(overpayment.period.endDate as Moment),
        value: overpayment.value
      });
    })
  }

  private getMonthsNumberBetweenFirstDate(startOverpaymentDate: Moment): number {
    const monthsBetween = this.getAbsoluteMonths(startOverpaymentDate) - this.absoluteMonthsOfFirstDate;
    if (monthsBetween < 0) { return 0; }
    return monthsBetween;
  }

  private getAbsoluteMonths(date: Moment): number {
    const months = Number(date.format('MM'));
    const years = Number(date.format('YYYY'));
    return months + (years * 12);
  }

  private sumOfOverpayments(): void {
    const numberOfMonths = this.loanParametersService.getNumberOfMonths();
    this.sumOfOverpaymentsData = [];
    console.log(this.overpaymentsData);
    for (let i = 1; i <= numberOfMonths; i++) {
      let value = 0;
      this.overpaymentsData.forEach((overpayment: OverpaymentData) => {
        if (i >= overpayment.startMonth && i <= overpayment.endMonth) {
          value += overpayment.value;
        }
      });
      this.sumOfOverpaymentsData.push({
        value: value,
        index: i
      });
    }
    console.log(this.sumOfOverpaymentsData);
  }
 
}
