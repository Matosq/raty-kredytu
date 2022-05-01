import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-title',
  templateUrl: './field-title.component.html',
  styleUrls: ['./field-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldTitleComponent implements OnInit {
  @Input() title = '';
  @Input() tooltipText = '';
  constructor() { }

  ngOnInit(): void {
  }

}
