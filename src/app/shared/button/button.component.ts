import { Component, Input, OnInit, Output } from '@angular/core';
import { ButtonConfig } from '../models/button-config.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() configuration!: ButtonConfig;
  @Input() onClick = () => {};
  constructor() { }

  ngOnInit(): void {
  }

}
