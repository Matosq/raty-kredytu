import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DonutChartData } from '../models/donut-chart-data.model';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutChartComponent {
  @Input() bars: DonutChartData[] = [];
}
