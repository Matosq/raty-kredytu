import { Component, OnInit } from '@angular/core';
import { IconName } from '../models/icon-names.model';

@Component({
  selector: 'app-info-tooltip',
  templateUrl: './info-tooltip.component.html',
  styleUrls: ['./info-tooltip.component.scss']
})
export class InfoTooltipComponent implements OnInit {
  public icon = IconName.INFO;
  constructor() { }

  ngOnInit(): void {
  }

  public showTooltip(): void {
    console.log('tooltip');
  }
}
