import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-title',
  templateUrl: './field-title.component.html',
  styleUrls: ['./field-title.component.scss']
})
export class FieldTitleComponent implements OnInit {
  @Input() title = '';
  @Input() tooltipText = '';
  constructor() { }

  ngOnInit(): void {
  }

}
