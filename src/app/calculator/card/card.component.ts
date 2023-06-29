import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LegendColor } from '../models/legend.model';
import { MonthCalculation } from '../models/month-calculation.model';
import { BarData, BarId } from '../models/bar.model';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
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

  public calcBars(): BarData[] {
    const principal = this.bars.find(b => b.id === BarId.PRINCIPAL);
    (principal as BarData).width = this.calcPercentage(this.data.principal);
    (principal as BarData).value = this.data.principal;

    const interest = this.bars.find(b => b.id === BarId.INTEREST);
    (interest as BarData).width = this.calcPercentage(this.data.interest);
    (interest as BarData).value = this.data.interest;

    const sumExtraCosts = this.bars.find(b => b.id === BarId.COST);
    (sumExtraCosts as BarData).width = this.calcPercentage(this.data.sumExtraCosts);
    (sumExtraCosts as BarData).value = this.data.sumExtraCosts;

    const overpayments = this.bars.find(b => b.id === BarId.OVERPAYMENTS);
    (overpayments as BarData).width = this.calcPercentage(this.data.overpayments);
    (overpayments as BarData).value = this.data.overpayments;
    return this.bars.filter(b => b.width > 0);
  }

  private calcPercentage(value: number): number {
    return (value / this.data.payment) * 100;
  }
}
