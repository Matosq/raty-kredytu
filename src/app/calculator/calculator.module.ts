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



@NgModule({
  declarations: [
    CalculatorComponent,
    LoanComponent,
    TranchesComponent,
    CardComponent,
    SimulationComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputFieldModule,
    CardHeaderModule,
    ButtonToggleModule,
    DatepickerModule
  ],
  exports: [
    CalculatorComponent
  ]
})
export class CalculatorModule { }
