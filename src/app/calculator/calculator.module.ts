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
import { OverpaymentsComponent } from './overpayments/overpayments.component';
import { DividerModule } from '../shared/divider/divider.module';
import { RateComponent } from './rate/rate.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BarChartModule } from '../shared/bar-chart/bar-chart.module';
import { SliderModule } from '../shared/slider/slider.module';
import { DonutChartModule } from '../shared/donut-chart/donut-chart.module';
import { SummaryComponent } from './summary/summary.component';
import { LegendComponent } from './legend/legend.component';

@NgModule({
  declarations: [
    CalculatorComponent,
    LoanComponent,
    TranchesComponent,
    CardComponent,
    SimulationComponent,
    CostsComponent,
    OverpaymentsComponent,
    RateComponent,
    SummaryComponent,
    LegendComponent
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
    DividerModule,
    MatExpansionModule,
    BarChartModule,
    SliderModule,
    DonutChartModule
  ],
  exports: [
    CalculatorComponent
  ]
})
export class CalculatorModule { }
