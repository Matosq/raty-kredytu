import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { Subscription } from 'rxjs';
import { CreditParameterDatepicker, ParameterField } from 'src/app/calculator/models/credit-parameter.model';
import { DatepickerRangeFormat, DateRange } from 'src/app/calculator/models/date.model';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: DatepickerRangeFormat
    }
  ]
})
export class DatepickerRangeComponent implements ParameterField, OnInit {
  @Input() configuration!: CreditParameterDatepicker;
  @Output() readonly valueChange = new EventEmitter<DateRange>();
  public readonly dateSelectorGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl()
  });
  private dateChangesSubscription: Subscription = new Subscription();
  constructor(private adapter: DateAdapter<Date>) { }

  ngOnInit(): void {
    this.adapter.setLocale("pl");
    this.dateChangesSubscription = this.dateSelectorGroup.valueChanges.subscribe(
      (value: DateRange) => {
        if (value.startDate?.isValid() && value.endDate?.isValid()) {
          this.valueChange.emit(value);
        }
      }
    );
  }

  public onDestroy(): void {
    this.dateChangesSubscription.unsubscribe();
  }
}
