import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IconName } from '../models/icon-names.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent {
  @Input() maxValue!: number;
  @Input() value = 1;
  @Output() valueChange = new EventEmitter<number>();
  public readonly IconNameType = IconName;

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

  public onChanges(value: number): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}
