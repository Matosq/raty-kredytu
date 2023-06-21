import { Injectable } from '@angular/core';
import { SimulationDataService } from './simulation-data.service';
import { Summary, SummaryDataService } from './summary-data.service';
import { Subscription } from 'rxjs';
import { MonthCalculation } from '../models/month-calculation.model';
import { LoanParametersService } from './loan-parameters.service';
import { Installments } from 'src/app/shared/button-toggle/installment.model';
import { getInstallmentsAsText, round } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private simulationData: MonthCalculation[] = [];
  private summaryData!: Summary;
  private subscriptions: Subscription = new Subscription();
  constructor(
    private simulationDataService: SimulationDataService,
    private summaryDataService: SummaryDataService,
    private loanParametersService: LoanParametersService,
  ) { }

  public subscribeData(): void {
    this.subscriptions.add(this.simulationDataService.getSimulationData$().subscribe(d => this.simulationData = d));
    this.subscriptions.add(this.summaryDataService.getSummaryData$().subscribe(d => this.summaryData = d));
  }

  public unsubscribe(): void {
    this.subscriptions.unsubscribe();
  }

  public getReport(): void {
    let blob = new Blob([this.createReport()],
      { type: "text/plain;charset=utf-8" });
    this.downloadBlob(blob);
  }

  private createReport(): string {
    let data = '';
    this.simulationData.forEach((c: MonthCalculation) => {
      data += '\n' + c.index + '\t ' + c.date + '\t ' + round(c.principal).toFixed(2) + '\t\t\t ' + round(c.interest).toFixed(2) + ' \t\t' +
        round(c.sumExtraCosts).toFixed(2) + '\t\t ' + round(c.overpayments).toFixed(2) + '\t\t ' + round(c.payment).toFixed(2) + '\t\t' +
        round((c.rate * 100)) + '\t\t ' + round(c.saldo).toFixed(2);
    }
    );


    return 'Symulacja rat kredytu \n\n' +
      getInstallmentsAsText(this.loanParametersService.getInstallments()) +
      '\t okres kredytowania: ' + this.loanParametersService.getNumberOfMonths() + '\t kwota kredytu: ' + this.loanParametersService.getAmountLoan() +
      '\noprocentowanie: ' + this.loanParametersService.getRate() +

      '\t\tkoszt całkowity: ' + round(this.summaryDataService.sumTotalCosts(this.summaryData.summary)).toFixed(2) +
      '\n\nrata \t miesiąc-rok \t część kapitałowa \t odsetki \t koszty dodatkowe \t nadpłata \t do zapłata \t oprocentowanie \t saldo kredytu\n' + data;
  }

  private downloadBlob(blob: Blob) {
    const blobUrl = URL.createObjectURL(blob);
    const linkElement = document.createElement("a");
    linkElement.download = this.getFileName();
    linkElement.href = blobUrl;
    document.body.appendChild(linkElement);
    linkElement.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
    document.body.removeChild(linkElement);
  }

  private getFileName(): string {
    return 'symulacja_kredytu_' + getInstallmentsAsText(this.loanParametersService.getInstallments()).replace(' ', '_') +
      '_' + this.loanParametersService.getNumberOfMonths() + '.txt';
  }
}