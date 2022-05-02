import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FieldTitleConfig } from 'src/app/calculator/models/credit-parameter.model';

@Component({
  selector: 'app-field-title',
  templateUrl: './field-title.component.html',
  styleUrls: ['./field-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldTitleComponent {
  @Input() config!: FieldTitleConfig;
}
