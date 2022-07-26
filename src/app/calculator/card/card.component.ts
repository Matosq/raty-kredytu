import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Bar } from 'src/app/shared/bar-chart/bar-chart.component';
import { LegendColor } from '../models/legend.model';
import { MonthCalculation } from '../models/month-calculation.model';

export enum BarId {
  COST = 'cost',
  PRINCIPAL = ' principal',
  INTEREST = 'interest',
  OVERPAYMENTS = 'overpayments'
}

export type BarData = Bar & { id: BarId, name: string, value: number };
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  @Input() data!: MonthCalculation;
  public bars: BarData[] = [
    {
      id: BarId.PRINCIPAL,
      name: 'kapitał',
      color: LegendColor.PRINCIPALS,
      width: 0,
      value: 0
    },
    {
      id: BarId.INTEREST,
      name: 'odsetki',
      color: LegendColor.INTERESTS,
      width: 0,
      value: 0
    },
    {
      id: BarId.COST,
      name: 'koszty dodatkowe',
      color: LegendColor.COSTS,
      width: 0,
      value: 0
    },
    {
      id: BarId.OVERPAYMENTS,
      name: 'nadpłaty',
      color: LegendColor.OVERPAYMENTS,
      width: 0,
      value: 0
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  public calcBars(): BarData[] {
    const principal = this.bars.find(b => b.id === BarId.PRINCIPAL)!;
    principal.width = this.calcPercentage(this.data.principal);
    principal.value = this.data.principal;

    const interest = this.bars.find(b => b.id === BarId.INTEREST)!;
    interest.width = this.calcPercentage(this.data.interest);
    interest.value = this.data.interest;

    const sumExtraCosts = this.bars.find(b => b.id === BarId.COST)!;
    sumExtraCosts.width = this.calcPercentage(this.data.sumExtraCosts);
    sumExtraCosts.value = this.data.sumExtraCosts;

    const overpayments = this.bars.find(b => b.id === BarId.OVERPAYMENTS)!;
    overpayments.width = this.calcPercentage(this.data.overpayments);
    overpayments.value = this.data.overpayments;
    return this.bars.filter(b => b.width > 0);
  }

  private calcPercentage(value: number): number {
    return (value / this.data.payment) * 100;
  }
}
