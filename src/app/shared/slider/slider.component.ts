import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconName } from '../models/icon-names.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit {
  @Input() maxValue!: number;
  @Output() valueChange = new EventEmitter<number>();
  public readonly IconNameType = IconName;
  public value = 1;
  constructor() { }

  ngOnInit(): void {
  }

  public increase(): void {
    if (this.value >= this.maxValue) { return; }
    this.value++;
    this.valueChange.emit(this.value);
  }

  public decrease(): void {
    if (this.value <= 1) { return; }
    this.value--;
    this.valueChange.emit(this.value);
  }

  public onChanges(value: any): void {
    this.valueChange.emit(value);
  }
}
