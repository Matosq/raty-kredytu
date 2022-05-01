import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MonthCalculation } from '../models/month-calculation.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  @Input() data!: MonthCalculation;
  // public monthIndex = 1;
  // public data = 'styczeń 2022';
  // public interestRate = 0.051234;
  // public principal = 1094.34;
  // public interest = 786.15;
  // public extraCosts = 56.27;
  // public overpayments = 0.00;
  // public payment = 11880.49;
  // public saldo = 375110.2312432221;

  constructor() { }

  ngOnInit(): void {
  }
}
