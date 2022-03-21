import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text = 'Dodaj';
  @Input() icon = 'add';
  @Input() onClick = () => {};
  constructor() { }

  ngOnInit(): void {
  }

}
