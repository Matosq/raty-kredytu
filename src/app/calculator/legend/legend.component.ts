import { Component, Input } from '@angular/core';
import { Legend } from '../models/legend.model';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent {
  @Input() data!: Legend;
}
