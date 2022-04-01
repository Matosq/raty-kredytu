import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import moment, { Moment } from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Installments } from 'src/app/shared/button-toggle/installment.model';


export interface CreditPeriod {
  startDate: Moment;
  endDate: Moment;
}

@Injectable({
  providedIn: 'root',
})
export class LoanParametersService {
  private amountLoan: number = 0;
  private numberOfMonths: number = 0;
  private rate: number = 0;
  private installments: Installments = Installments.EQUAL;
  private firstPaymentDate: Moment = moment();
  private creditPeriod: CreditPeriod = {
    startDate: moment(),
    endDate: moment()
  }

  private amountLoanSubject = new BehaviorSubject<number>(this.amountLoan);
  private numberOfMonthsSubject = new BehaviorSubject<number>(this.numberOfMonths);
  private rateSubject = new BehaviorSubject<number>(this.rate);
  private installmentsSubject = new BehaviorSubject<Installments>(this.installments);
  private creditPeriodSubject = new BehaviorSubject<CreditPeriod>(this.creditPeriod);
  private firstPaymentDateSubject = new BehaviorSubject<Moment>(this.firstPaymentDate);

  constructor() { }

  public setAmountLoan(value: number): void {
    this.amountLoan = value;
    this.amountLoanSubject.next(value);
  }

  public setNumberOfMonths(value: number): void {
    this.numberOfMonths = value;
    this.creditPeriod.endDate.add(this.numberOfMonths, 'months');
    this.numberOfMonthsSubject.next(value);
    this.creditPeriodSubject.next(this.creditPeriod);
  }

  public setRate(value: number): void {
    this.rate = value;
    this.rateSubject.next(value);
  }

  public setInstallments(value: Installments): void {
    this.installments = value;
    this.installmentsSubject.next(value);
  }

  public setStartDate(value: Moment): void {
    this.creditPeriod.startDate = value;
    this.creditPeriod.endDate = cloneDeep(value);
    this.creditPeriod.endDate.add(this.numberOfMonths, 'months');
    this.creditPeriodSubject.next(this.creditPeriod);
  }

  public setFirstPaymentDate(value: Moment): void {
    this.firstPaymentDate = value;
    this.firstPaymentDateSubject.next(value);
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

  public getCreditPeriod(): CreditPeriod {
    return this.creditPeriod;
  }

  public getFirstPaymentDate(): Moment {
    return this.firstPaymentDate;
  }

  public getAmountLoan$(): Observable<number> {
    return this.amountLoanSubject.asObservable();
  }

  public getNumberOfMonths$(): Observable<number> {
    return this.numberOfMonthsSubject.asObservable();
  }

  public getRate$(): Observable<number> {
    return this.rateSubject.asObservable();
  }

  public getInstallments$(): Observable<Installments> {
    return this.installmentsSubject.asObservable();
  }

  public getCreditPeriod$(): Observable<CreditPeriod> {
    return this.creditPeriodSubject.asObservable();
  }

  public getFirstPaymentDate$(): Observable<Moment> {
    return this.firstPaymentDateSubject.asObservable();
  }
}
