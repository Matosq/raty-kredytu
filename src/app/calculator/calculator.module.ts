import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import { ButtonModule } from '../shared/button/button.module';
import { InputFieldModule } from '../shared/input-field/input-field.module';
import { LoanComponent } from './loan/loan.component';
import { TranchesComponent } from './tranches/tranches.component';
import { CardHeaderModule } from '../shared/card-header/card-header.module';
import { ButtonToggleModule } from '../shared/button-toggle/button-toggle.module';
import { DatepickerModule } from '../shared/datepicker/datepicker.module';
import { CardComponent } from './card/card.component';
import { SimulationComponent } from './simulation/simulation.component';
import { CostsComponent } from './costs/costs.component';
import { TextFieldModule } from '../shared/text-field/text-field.module';
import { SelectFieldModule } from '../shared/select-field/select-field.module';
import { DatepickerRangeModule } from '../shared/datepicker-range/datepicker-range.module';
import { OverpaymentsComponent } from './overpayments/overpayments.component';
import { DividerModule } from '../shared/divider/divider.module';
import { RateComponent } from './rate/rate.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    CalculatorComponent,
    LoanComponent,
    TranchesComponent,
    CardComponent,
    SimulationComponent,
    CostsComponent,
    OverpaymentsComponent,
    RateComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputFieldModule,
    CardHeaderModule,
    ButtonToggleModule,
    DatepickerModule,
    TextFieldModule,
    SelectFieldModule,
    DatepickerRangeModule,
    DividerModule,
    MatExpansionModule
  ],
  exports: [
    CalculatorComponent
  ]
})
export class CalculatorModule { }
