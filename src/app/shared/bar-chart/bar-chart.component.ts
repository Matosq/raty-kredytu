import { Component, Input, OnChanges } from '@angular/core';
import { widthResizeAnimation } from 'src/app/core/animations/widthResize';
import { Bar } from '../models/bar.model';
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
