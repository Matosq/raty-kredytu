import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { default as _rollupMoment, Moment } from 'moment';
import { Subscription } from 'rxjs';
import { CreditParameterDatepicker, ParameterField } from 'src/app/calculator/models/credit-parameter.model';
import { DatepickerFormat } from 'src/app/calculator/models/date.model';

const moment = _rollupMoment;

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: DatepickerFormat
    },
  ]
})
export class DatepickerComponent implements ParameterField, OnInit, OnChanges {
  @Input() configuration!: CreditParameterDatepicker;
  @Output() valueChange = new EventEmitter<Moment>();
  public date!: UntypedFormControl;
  private dateChangesSubscription!: Subscription;
  constructor(private adapter: DateAdapter<Date>) { }

  ngOnInit(): void {
    this.adapter.setLocale("pl");
    this.setDateFromConfiguration();
    this.subscribeToDateValueChanges();
  }

  public ngOnChanges(): void {
    this.setDateFromConfiguration();
  }

  public chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());;
    this.date.setValue(ctrlValue);
  }

  public chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  public onDestroy(): void {
    this.dateChangesSubscription.unsubscribe();
  }

  private setDateFromConfiguration(): void {
    if (this.configuration.date?.isValid()) {
      this.date = new UntypedFormControl(this.configuration.date);
      return;
    }
    this.date = new UntypedFormControl(moment());
  }

  private subscribeToDateValueChanges(): void {
    this.dateChangesSubscription = this.date.valueChanges.subscribe(
      (value: Moment) => {
        if (value.isValid()) {
          this.valueChange.emit(value);
        }
      }
    );
  }
}
