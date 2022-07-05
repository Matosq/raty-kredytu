import { Cost } from "../services/costs-data.service";

export interface MonthCalculation {
    index: number,
    date: string,
    rate: number,
    principal: number,
    interest: number,
    installment: number,
    extraCosts: Cost[],
    sumExtraCosts: number,
    overpayments: number,
    payment: number,
    saldo: number,
    tranche?: number,
}
  