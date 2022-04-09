import { Injectable } from '@angular/core';
import { Overpayment } from '../models/overpayments.model';

@Injectable({
  providedIn: 'root'
})
export class OverpaymentsService {

  constructor() { }

  public addOverpayment(overpayment: Overpayment): void {
    console.log(overpayment);
  }
}
