import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MonthCalculation } from '../models/month-calculation.model';

@Injectable({
  providedIn: 'root'
})
export class SimulationDataService {
  private simulation: MonthCalculation[] = [];
  private simulationSubject = new BehaviorSubject<MonthCalculation[]>(this.simulation);
  constructor() { }

  public setSimulationData(data: MonthCalculation[]): void {
    this.simulation = data;
    this.simulationSubject.next(data);
  }

  public getSimulationData$(): Observable<MonthCalculation[]> {
    return this.simulationSubject.asObservable();
  }
}
