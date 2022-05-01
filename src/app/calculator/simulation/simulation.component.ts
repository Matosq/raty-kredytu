import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  public data: MonthCalculation[] = [];
  private simulationDataSubsription!: Subscription;
  constructor(
    private simulationData: SimulationDataService
  ) { }

  ngOnInit(): void {
    this.simulationDataSubsription = this.simulationData.getSimulationData$().subscribe(
      (monthsCalculation: MonthCalculation[]) => {
        this.data = monthsCalculation;
      }
    );
  }

  public ngOnDestroy(): void {
    this.simulationDataSubsription.unsubscribe();
  }

}
