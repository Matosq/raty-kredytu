import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, throttleTime } from 'rxjs';
import { ButtonConfig, ButtonType } from '../models/button-config.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit, OnDestroy {
  @Input() configuration!: ButtonConfig;
  @Input() isDisabled = false;
  @Output() onClick =  new EventEmitter();
  private buttonClickSubject = new Subject<boolean>();
  private buttonClickSubscription!: Subscription;
  constructor() { }

  public ngOnInit(): void {
    this.buttonClickSubscription = this.buttonClickSubject
    .pipe(throttleTime(500))
    .subscribe(_ => this.onClick.emit());
  }

  public ngOnDestroy(): void {
    this.buttonClickSubscription.unsubscribe();
  }

  public buttonClick(): void {
    this.buttonClickSubject.next(true);
  }

  public getButtonCssClass(type?: ButtonType): string {
    return type === ButtonType.SMALL ? 'small-button' : 'action-button';
  }
}
