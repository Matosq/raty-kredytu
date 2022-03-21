import { Injectable } from '@angular/core';
import moment, { Moment } from 'moment';
import { Installments } from 'src/app/shared/button-toggle/installment.model';


// export interface LoanParameters {
//   private amountLoan: number | null = null,
//   numberOfMonths: number | null,
//   rate: number | null,
//   installments: Installments | null,
//   startDate: Moment | null,
//   firstPaymentDate: Moment | null
// }

@Injectable({
  providedIn: 'root',
})
export class LoanParametersService {
  private amountLoan: number = 0;
  private numberOfMonths: number = 0;
  private rate: number = 0;
  private installments: Installments = Installments.EQUAL;
  private startDate: Moment = moment();
  private firstPaymentDate: Moment = moment();
  constructor() { }

  public setAmountLoan(value: number): void {
    console.log('amountLoan: ', this.amountLoan);
    this.amountLoan = value;
  }

  public setNumberOfMonths(value: number): void {
    this.numberOfMonths = value;
  }

  public setRate(value: number): void {
    this.rate = value;
  }

  public setInstallments(value: Installments): void {
    this.installments = value;
  }

  public setStartDate(value: Moment): void {
    this.startDate = value;
  }

  public setFirstPaymentDate(value: Moment): void {
    this.firstPaymentDate = value;
  }

  public getAmountLoan(): number {
    return this.amountLoan;
  }

  public getNumberOfMonths(): number {
    return this.numberOfMonths;
  }

  public getRate(): number {
    return this.rate;
  }

  public getInstallments(): Installments {
    return this.installments;
  }

  public getStartDate(): Moment {
    return this.startDate;
  }

  public getFirstPaymentDate(): Moment {
    return this.firstPaymentDate;
  }
}
