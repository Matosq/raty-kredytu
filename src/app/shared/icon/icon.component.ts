import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconName } from '../models/icon-names.model';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  @Input() icon!: IconName;
}