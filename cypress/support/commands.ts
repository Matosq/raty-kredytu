import { SimulationSelector, SummarySelector } from "./selectors";

Cypress.Commands.add('checkInstallment', (monthIndex: string, payment: string, saldo: string, rate: string) => {
  cy.get(SimulationSelector.SIMULATION).contains('Rata nr ' + monthIndex);
  cy.get(SimulationSelector.PAYMENT).contains(payment);
  cy.get(SimulationSelector.SALDO).contains(saldo);
  cy.get(SimulationSelector.RATE).contains(rate);
});

Cypress.Commands.add('checkInstallmentLegend', (principal: string, interests: string, costs = '0,00 zł', overpayments = '0,00 zł') => {
  cy.get(SimulationSelector.LEGEND).contains(principal);
  cy.get(SimulationSelector.LEGEND).contains(interests);
  cy.get(SimulationSelector.LEGEND).contains(costs);
  cy.get(SimulationSelector.LEGEND).contains(overpayments);
});

Cypress.Commands.add('setSliderValue', (value: string) => {
  cy.get(SimulationSelector.SLIDER).invoke('val', value).trigger('input');
});

Cypress.Commands.add('checkSummary', (totalCost: string, installments: string, period: string) => {
  cy.get(SummarySelector.TOTAL_COST).contains(totalCost);
  cy.get(SummarySelector.INSTALLMENTS).contains(installments);
  cy.get(SummarySelector.PERIOD).contains(period);
});

Cypress.Commands.add('checkSummaryLegend', (principal: string, interests: string, costs = '0,00 zł', overpayments = '0,00 zł') => {
  cy.get(SummarySelector.LEGEND).contains(principal);
  cy.get(SummarySelector.LEGEND).contains(interests);
  cy.get(SummarySelector.LEGEND).contains(costs);
  cy.get(SummarySelector.LEGEND).contains(overpayments);
});

