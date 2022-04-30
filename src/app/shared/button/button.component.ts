import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, throttleTime } from 'rxjs';
import { ButtonConfig } from '../models/button-config.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, OnDestroy {
  @Input() configuration!: ButtonConfig;
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
}
