
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormControl, FormControlStatus, Validators } from '@angular/forms';
import { combineLatest, debounceTime, Subject, Subscription } from 'rxjs';
import { CreditParameterInputField, InputFieldValue, ParameterField } from 'src/app/calculator/models/credit-parameter.model';
import { IconName } from '../models/icon-names.model';
@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements ParameterField, OnInit, OnDestroy {
  @Input() configuration!: CreditParameterInputField;
  @Output() valueChange = new EventEmitter<InputFieldValue>();
  private updateValueSubject = new Subject<InputFieldValue>();
  private updateValueSubscription!: Subscription;
  public readonly IconNameType = IconName;
  public numberFormControl!: UntypedFormControl;

  public ngOnInit(): void {
    this.initFormControl();
    this.subscribeToFormControlChanges();
    this.throttleValueUpdates();
  }

  public ngOnDestroy(): void {
    this.updateValueSubscription.unsubscribe();
  }

  public increase(): void {
    if (!this.configuration.stepValue) { return; }
    const value = Math.round((Number(this.configuration.value) + this.configuration.stepValue) * 100) / 100;
    this.setValueAndMarkAsTouched(value);
  }

  public decrease(): void {
    if (!this.configuration.stepValue) { return; }
    const value = Math.round((Number(this.configuration.value) - this.configuration.stepValue) * 100) / 100;
    this.setValueAndMarkAsTouched(value);
  }

  public getErrorText(): string {
    if (this.numberFormControl.hasError('min')) {
      return `Podaj wartość większą niż ${this.configuration?.validation?.min}`
    } else if (this.numberFormControl.hasError('max')) {
      return `Wartość maksymalna wynosi ${this.configuration?.validation?.max}`
    } else if (this.numberFormControl.hasError('pattern')) {
      return `Podaj liczbę całkowitą`
    } else {
      return `Podaj wartość liczbową`
    }
  }

  private initFormControl(): void {
    this.numberFormControl = new UntypedFormControl('',
      [
        Validators.required,
        Validators.min(this.configuration?.validation?.min as number + 0.000000001),
        Validators.max(this.configuration?.validation?.max as number),
        ...(this.configuration?.validation?.integerOnly as boolean ? [Validators.pattern("^[0-9]*$")] : [])
      ]
    );
    this.setValueAndMarkAsTouched(this.configuration.value as number);
  }

  private subscribeToFormControlChanges(): void {
    combineLatest([this.numberFormControl.valueChanges, this.numberFormControl.statusChanges])
      .pipe(debounceTime(50))
      .subscribe(
        (formControl: [number, FormControlStatus]) => {
          this.onChange({ value: formControl[0], status: formControl[1] });
        }
      );
  }

  private throttleValueUpdates(): void {
    this.updateValueSubscription = this.updateValueSubject
      .pipe(debounceTime(100))
      .subscribe((value: InputFieldValue) => this.valueChange.emit(value));
  }

  private onChange(inputFieldValue: InputFieldValue): void {
    this.configuration.value = inputFieldValue.value;
    this.updateValue(inputFieldValue);
  }

  private updateValue(inputFieldValue: InputFieldValue): void {
    this.updateValueSubject.next(inputFieldValue);
  }

  private setValueAndMarkAsTouched(value: number): void {
    this.numberFormControl.setValue(value);
    this.numberFormControl.markAsTouched();
  }
}
