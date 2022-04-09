import { Injectable } from '@angular/core';
import { Overpayment } from '../models/overpayments.model';

export type OverpaymentPosition = Overpayment & { indexOfOverpayment: number };

@Injectable({
  providedIn: 'root'
})
export class OverpaymentsService {
  private overpayments: OverpaymentPosition[] = [];
  private index = 0;
  constructor() { }

  public addOverpayment(overpayment: Overpayment): void {
    this.overpayments.push({
      ...overpayment,
      indexOfOverpayment: this.index++
    });
    console.log(this.overpayments);
  }

  public removeOverpayment(index: number): void {
    this.overpayments.filter((o: OverpaymentPosition) => o.indexOfOverpayment !== index)
  }

  public getOverpayments(): OverpaymentPosition[] {
    return this.overpayments
  }
}
