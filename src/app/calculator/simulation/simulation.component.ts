import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MonthCalculation } from '../models/month-calculation.model';
import { SimulationDataService } from '../services/simulation-data.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulationComponent implements OnInit {
  public monthsCalculation: MonthCalculation[] = [];
  public chosenMonth!: MonthCalculation;
  private simulationDataSubsription!: Subscription;
  constructor(
    private simulationData: SimulationDataService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.simulationDataSubsription = this.simulationData.getSimulationData$().subscribe(
      (calculation: MonthCalculation[]) => {
        this.monthsCalculation = calculation;
        this.changeDetector.detectChanges();
      }
    );
    this.monthsCalculation = [{
      date: 'kwi 2031',
      extraCosts: [],
      index: 106,
      installment: 1832,
      interest: 832,
      overpayments: 0,
      payment: 1932,
      principal: 1000,
      rate: 0.0512,
      saldo: 194000,
      sumExtraCosts: 100,
      tranche: 0,
    }];
    this.chosenMonth = this.monthsCalculation[0];
    this.changeDetector.detectChanges();
  }

  public ngOnDestroy(): void {
    this.simulationDataSubsription.unsubscribe();
  }
  
  public onSliderChanges(value: number): void {
    this.chosenMonth = this.monthsCalculation[value - 1];
    this.changeDetector.detectChanges();
  }

  public getSimulationCardTitle(): string {
    console.log(this.chosenMonth.index);
    return this.chosenMonth?.index ? String(this.chosenMonth.index) : "Wybierz ratę";
  }
}
