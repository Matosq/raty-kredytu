import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MonthCalculation } from '../models/month-calculation.model';
import { SimulationDataService } from '../services/simulation-data.service';
import { SectionCard, SectionCardHeader } from '../models/section-card.model';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulationComponent implements SectionCard, OnInit {
  public readonly cardHeader = SectionCardHeader.SIMULATION;
  protected monthsCalculation: MonthCalculation[] = [];
  protected chosenMonth!: MonthCalculation;
  protected sliderMaxValue = 0;
  protected sliderValue = 1;
  protected isSimulationData = false;
  private simulationDataSubsription!: Subscription;
  constructor(
    private simulationData: SimulationDataService,
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.simulationDataSubsription = this.simulationData.getSimulationData$().subscribe(
      (calculation: MonthCalculation[]) => {
        this.onDataChange(calculation);
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

  private onDataChange(calculation: MonthCalculation[]): void {
    this.isSimulationData = calculation.length > 0;
    if (!this.isSimulationData) { return };
    this.monthsCalculation = calculation;
    this.sliderMaxValue = calculation.length;
    this.onSliderChanges(1);
  }
}
