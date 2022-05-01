import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconName } from '../models/icon-names.model';

@Component({
  selector: 'app-info-tooltip',
  templateUrl: './info-tooltip.component.html',
  styleUrls: ['./info-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoTooltipComponent {
  @Input() text = '';
  public readonly icon = IconName.INFO;
}
