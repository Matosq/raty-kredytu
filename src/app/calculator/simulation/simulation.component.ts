import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
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
  public sliderMaxValue = 0;
  public sliderValue = 1;
  private simulationDataSubsription!: Subscription;
  constructor(
    private simulationData: SimulationDataService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.simulationDataSubsription = this.simulationData.getSimulationData$().subscribe(
      (calculation: MonthCalculation[]) => {
        this.monthsCalculation = calculation;
        this.sliderMaxValue = calculation.length;
        this.changeDetector.detectChanges();
        this.onSliderChanges(1);
      }
    );
  }

  public ngOnDestroy(): void {
    this.simulationDataSubsription.unsubscribe();
  }

  public getMaxValueOfSlider(): number {
    return this.sliderMaxValue;
  }

  public onSliderChanges(value: number): void {
    this.sliderValue = value;
    this.chosenMonth = this.monthsCalculation[this.sliderValue - 1];
    this.changeDetector.detectChanges();
  }

  public getSimulationCardTitle(): string {
    return this.chosenMonth?.index ? String(this.chosenMonth.index) : "Wybierz ratę";
  }
}
