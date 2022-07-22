import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';


export interface DonutChartData {
  color: string,
  width: number,
  rotate: number
};
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
