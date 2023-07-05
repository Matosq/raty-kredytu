/* eslint-disable @typescript-eslint/no-namespace */
import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      checkInstallment(monthIndex: string, payment: string, saldo: string, rate: string): void;
      checkInstallmentLegend(principal: string, interests: string, costs?: string, overpayments?: string): void;
      setSliderValue(value: string): void;
      checkSummary(totalCost: string, installments: string, period: string): void;
      checkSummaryLegend(principal: string, interests: string, costs?: string, overpayments?: string): void;
    }
  }
}