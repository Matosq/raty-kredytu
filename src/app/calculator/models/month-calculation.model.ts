import { CostData } from "./costs.model";

export interface MonthCalculation {
  index: number,
  date: string,
  rate: number,
  principal: number,
  interest: number,
  installment: number,
  extraCosts: CostData[],
  sumExtraCosts: number,
  overpayments: number,
  payment: number,
  saldo: number,
  tranche?: number,
}
