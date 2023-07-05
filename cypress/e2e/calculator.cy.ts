import { ButtonSelector, CostsSelector, LoanParamsSelector, SelectFieldSelector } from "cypress/support/selectors";

describe('Calculator tests', () => {
  it('Calculate simple loan', () => {
    cy.visit('/');
    cy.contains('Kalkulator kredytu hipotecznego');
    cy.get(ButtonSelector.CALCULATE_LOAN).click();

    cy.checkInstallment('1', '1 774,81 zł', '299 529,74 zł', '5,12%');
    cy.checkInstallmentLegend('470,26 zł', '1 304,55 zł');

    cy.setSliderValue('300');

    cy.checkInstallment('300', '1 896,66 zł', '0,00 zł', '5,12%');
    cy.checkInstallmentLegend('1 888,73 zł', '7,93 zł');
    cy.checkSummary('532 564,39 zł', 'raty równe', '25 lat');
    cy.checkSummaryLegend('300 000,00 zł', '232 564,39 zł', '0,00 zł', '0,00 zł');
  })

  it('Calculate loan with additional cost', () => {
    cy.visit('/');
    cy.get(LoanParamsSelector.LOAN_PANEL).contains('parametry kredytu');
    cy.get(LoanParamsSelector.AMOUNT_LOAN).clear().type('1000 000');
    cy.get(LoanParamsSelector.MONTHS_CREDIT).clear().type('360');
    cy.get(LoanParamsSelector.RATE).clear().type('9.5');

    cy.get(LoanParamsSelector.LOAN_PANEL).get(ButtonSelector.TOGGLE_SECOND).click();

    cy.get(CostsSelector.COSTS_PANEL_HEADER).click();
    cy.get(CostsSelector.COSTS_NAME).clear().type('ubezpieczenie');
    cy.get(CostsSelector.MONTHS_COSTS).clear().type('360');
    cy.get(CostsSelector.COSTS_TYPE).click();
    cy.get(SelectFieldSelector.SECOND_OPTION).click();
    cy.get(CostsSelector.BALANCE_RATE_COST).clear().type('0.02');

    cy.get(ButtonSelector.ADD_COSTS).click();

    cy.get(CostsSelector.CURRENT_COSTS).contains('ubezpieczenie');
    cy.get(CostsSelector.CURRENT_COSTS).contains('0,02%');
    cy.get(CostsSelector.CURRENT_COSTS).contains('opr. salda kredytu');

    cy.checkInstallment('1', '11 046,27 zł', '997 222,22 zł', '9,5%');
    cy.checkInstallmentLegend('2 777,78 zł', '8 068,49 zł', '200,00 zł');

    cy.setSliderValue('360');

    cy.checkInstallment('360', '2 800,02 zł', '0,00 zł', '9,5%');
    cy.checkInstallmentLegend('2 777,78 zł', '21,69 zł', '0,56 zł');
    cy.checkSummary('2 465 268,80 zł', 'raty malejące', '30 lat');
    cy.checkSummaryLegend('1 000 000,00 zł', '1 429 168,80 zł', '36 100,00 zł', '0,00 zł');
  })
})
