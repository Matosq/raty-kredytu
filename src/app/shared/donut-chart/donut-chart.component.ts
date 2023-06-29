import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DonutChartData } from '../models/donut-chart-data.model';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutChartComponent implements OnInit {
  @Input() bars: DonutChartData[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
