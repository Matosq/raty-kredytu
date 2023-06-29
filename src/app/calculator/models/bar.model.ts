import { Bar } from "src/app/shared/models/bar.model";

export enum BarId {
  COST = 'cost',
  PRINCIPAL = ' principal',
  INTEREST = 'interest',
  OVERPAYMENTS = 'overpayments'
}

export type BarData = Bar & { id: BarId, name: string, value: number };