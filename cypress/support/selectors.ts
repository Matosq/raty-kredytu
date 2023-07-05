export enum ButtonSelector {
  CALCULATE_LOAN = '[data-cy=calculate-button]',
  ADD_COSTS = '[data-cy=add-cost-button] button',
  TOGGLE_FIRST = '#toggle-first',
  TOGGLE_SECOND = '#toggle-second',
}

export enum LoanParamsSelector {
  LOAN_PANEL = '[data-cy=loan-panel]',
  AMOUNT_LOAN = '#amount-loan-input',
  MONTHS_CREDIT = '#months-credit-input',
  RATE = '#rate-input',
}

export enum SelectFieldSelector {
  SECOND_OPTION = '#mat-option-1'
}

export enum CostsSelector {
  COSTS_PANEL_HEADER = '[data-cy=costs-panel-header]',
  MONTHS_COSTS = '#costs-months-input',
  COSTS_NAME = '#costs-name-input',
  COSTS_TYPE = '[data-cy=costs-type-select]',
  BALANCE_RATE_COST = '#costs-balance-input',
  CURRENT_COSTS = '[data-cy=current-costs]'
}

export enum SimulationSelector {
  SIMULATION = '[data-cy=simulation]',
  PAYMENT = '[data-cy=simulation-payment]',
  SALDO = '[data-cy=simulation-saldo]',
  RATE = '[data-cy=simulation-rate]',
  LEGEND = '[data-cy=simulation-legend]',
  SLIDER = 'input[type=range]',
}

export enum SummarySelector {
  TOTAL_COST = '[data-cy=summary-total-cost]',
  INSTALLMENTS = '[data-cy=summary-installments]',
  PERIOD = '[data-cy=summary-period]',
  LEGEND = '[data-cy=summary-legend]'
}
