import { Component, Input, OnChanges } from '@angular/core';
import { widthResizeAnimation } from 'src/app/core/animations/widthResize';

export interface Bar {
  color: string,
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
