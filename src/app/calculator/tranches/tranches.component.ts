import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import { Moment } from 'moment';
import { delay, of, Subscription } from 'rxjs';
import { fadeSlideInOutAnimation } from 'src/app/core/animations/fadeSlideIn';
import { ButtonConfig, ButtonType } from 'src/app/shared/models/button-config.model';
import { IconName } from 'src/app/shared/models/icon-names.model';
import { InputFieldValue } from '../models/credit-parameter.model';
import { SectionCard, SectionCardHeader } from '../models/section-card.model';
import { Tranche } from '../models/tranche.model';
import { TranchesParameters } from './tranches-parameters';
import { TranchePosition, TranchesService } from './tranches.service';
import { CalculateTriggerService } from '../services/calculate-trigger.service';

@Component({
  selector: 'app-tranches',
  templateUrl: './tranches.component.html',
  styleUrls: ['./tranches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeSlideInOutAnimation]
})
export class TranchesComponent extends TranchesParameters implements SectionCard, OnInit, OnDestroy {
  public cardHeader = SectionCardHeader.TRANCHES;
  public tranches: TranchePosition[] = [];
  public numberOfTranches = 0;
  public readonly addTrancheButton: ButtonConfig = {
    text: 'dodaj transzę',
    icon: IconName.ADD
  }
  public readonly deleteTrancheButton: ButtonConfig = {
    text: 'usuń',
    icon: IconName.DELETE,
    type: ButtonType.SMALL
  }
  public newTranche: Tranche = {
    date: moment(),
    percentage: 10,
    value: 0
  };

  private trancheLoanAmountSubscripton!: Subscription;
  private isTrancheValueFieldValid = true;
  constructor(
    private tranchesService: TranchesService,
    private changeDetectorRef: ChangeDetectorRef,
    private calculateTriggerService: CalculateTriggerService
  ) { super() }

  public ngOnInit(): void {
    this.trancheLoanAmountSubscripton = this.tranchesService.getTranchesValue$().subscribe(
      () => this.onLoanAmountChanges());
  }

  public ngOnDestroy(): void {
    this.trancheLoanAmountSubscripton.unsubscribe();
  }

  public updateNewTrancheDate(date: Moment): void {
    this.newTranche.date = date;
  }

  public updateNewTrancheValue(percentageInputField: InputFieldValue): void {
    this.newTranche.percentage = percentageInputField.value;
    this.isTrancheValueFieldValid = this.isFieldValid(percentageInputField.status);
    this.newTranche.value = this.calculatePercentageValue(percentageInputField.value);
    this.newTranchePercentageInput.hint = this.newTranche.value;
  }

  public isTrancheFieldValid(): boolean {
    return !!this.isTrancheValueFieldValid;
  }

  public areTranches(): boolean {
    return this.tranchesService.getTranches().length > 0;
  }

  public addTranche(): void {
    this.tranchesService.addTranche(this.newTranche);
    this.clearFieldsValue();
    this.tranches = this.tranchesService.getTranches();
    this.numberOfTranches = this.tranches.length;
    this.calculateLoan();
  }

  public deleteTranche(tranche: TranchePosition): void {
    tranche.isDeleted = true;
    this.tranchesService.deleteTranche(tranche);
    this.numberOfTranches = this.tranchesService.getTranches().length;
    of(null).pipe(delay(0)).subscribe(() => {
      this.tranches = this.tranchesService.getTranches();
    });
    this.calculateLoan();
  }

  public isTrancheDeleted(tranche: TranchePosition): boolean {
    return !!tranche?.isDeleted;
  }

  private onLoanAmountChanges(): void {
    this.newTranche.value = this.calculatePercentageValue(this.newTranche.percentage);
    this.newTranchePercentageInput.hint = this.newTranche.value;
    this.changeDetectorRef.detectChanges();
  }

  private calculatePercentageValue(value: number): number {
    return this.tranchesService.getAmountLoan() * 0.01 * value;
  }

  private clearFieldsValue(): void {
    this.newTranche.percentage = 10;
    this.newTranchePercentageInput.value = this.newTranche.percentage;
    this.newTranche.value = this.newTranche.percentage * 0.01 * this.tranchesService.getAmountLoan();
    this.newTranche.date = moment();
    this.datePickerField = cloneDeep(this.datePickerField);
    this.datePickerField.date = this.newTranche.date;
  }

  private calculateLoan(): void {
    this.calculateTriggerService.triggerLoanCalculation();
  }
}
