import { Component, Input, OnChanges } from '@angular/core';
import { LegendColor } from 'src/app/calculator/models/legend.model';
import { widthResizeAnimation } from 'src/app/core/animations/widthResize';

export interface Bar {
  color: LegendColor,
  width: number
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  animations: [widthResizeAnimation]
})
export class BarChartComponent implements OnChanges {
  @Input() bars!: Bar[];
  public triggerResize = true;

  ngOnChanges(): void {
    this.triggerResize = !this.triggerResize;
  }

}
