import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { ButtonConfig } from 'src/app/shared/models/button-config.model';
import { IconName } from 'src/app/shared/models/icon-names.model';
import { CreditParameterDatepicker, CreditParameterInputField } from '../models/credit-parameter.model';
import { SectionCard, SectionCardHeader } from '../models/section-card.model';
import { Tranche } from '../models/tranche.model';
import { TranchesDataService } from '../services/tranches-data.service';

interface FirstTrancheView {
  date: string,
  percentageValue?: number,
  value?: number
  trancheIndex: number
}

interface TrancheView {
  inputFieldConfig: CreditParameterInputField;
  trancheIndex: number,
  value: number
}

@Component({
  selector: 'app-tranches',
  templateUrl: './tranches.component.html',
  styleUrls: ['./tranches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranchesComponent implements SectionCard, OnInit {
  public cardHeader = SectionCardHeader.TRANCHES;
  public firstTranchePercentageInput: CreditParameterInputField = {
    fieldTitle: '',
    label: '%',
    value: 100,
    stepValue: 5,
  };
  public firstTranche: FirstTrancheView = {
    date: '',
    percentageValue: 100,
    value: 0,
    trancheIndex: 1
  };

  public tranchesView: TrancheView[] = [];
  public readonly addTrancheButton: ButtonConfig = {
    text: 'dodaj transzę',
    icon: IconName.ADD
  }
  public readonly removeTrancheButton: ButtonConfig = {
    text: 'usuń',
    icon: IconName.DELETE
  }
  public readonly trancheDatepicker: CreditParameterDatepicker = {
    fieldTitle: '',
    label: 'miesiąc i rok',
  }
  private tranchesDataSubscription!: Subscription;

  constructor(
    private tranchesDataService: TranchesDataService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscribeToTranchesData();
  }

  ngOnDestroy(): void {
    this.tranchesDataSubscription?.unsubscribe();
  }

  public addTranche(): void {
    this.tranchesDataService.addTranche();
  }

  public removeTranche(trancheId: number): void {
    this.tranchesDataService.removeTranche(trancheId);
  }

  public updateFirstTrancheValueOnRateChanges(percentage: number): void {
    this.firstTranche.percentageValue = percentage;
    this.firstTranche.value = this.tranchesDataService.getAmountLoan() * 0.01 * percentage;
    this.tranchesDataService.setTrancheValuesByTrancheId(percentage, this.firstTranche.trancheIndex as number);
  }

  public updateTrancheValueOnRateChangesByTrancheId(percentage: number, id: number): void {
    const tranche = this.tranchesView.find((tranche: TrancheView) => tranche.trancheIndex === id);
    if (!tranche) { return; }
    tranche.value = this.tranchesDataService.getAmountLoan() * 0.01 * percentage;
    this.tranchesDataService.setTrancheValuesByTrancheId(percentage, id);
  }

  public updateTranchesDateByTrancheId(date: Moment, id: number): void {
    this.tranchesDataService.setTrancheDateByTrancheId(date, id);
  }

  private subscribeToTranchesData(): void {
    this.tranchesDataSubscription = this.tranchesDataService.getTranches$().subscribe(
      (tranches: Tranche[]) => {
        this.updateDataForFirstTranche(tranches);
        this.updateDataForTranches(tranches);
        this.changeDetector.detectChanges();
      });
  }

  private updateDataForFirstTranche(tranches: Tranche[]): void {
    const firstTranche = tranches.find((tranche: Tranche) => (tranche.trancheId === 1)) as Tranche;
    this.firstTranche.date = firstTranche.date.locale('pl').format('MMMM') + ' ' + firstTranche.date.year();
    this.firstTranche.value = firstTranche.value;
    this.firstTranchePercentageInput.value = firstTranche.percentage;
  }

  private updateDataForTranches(tranches: Tranche[]): void {
    const tranchesData = tranches.filter((tranche: Tranche) => (tranche.trancheId !== 1));
    this.tranchesView = tranchesData.map((tranche: Tranche) => {
      return {
        trancheIndex: tranche.trancheId,
        value: tranche.value,
        inputFieldConfig: {
          fieldTitle: '',
          label: '%',
          value: tranche.percentage,
          stepValue: 5
        }
      }
    });
  }
}
