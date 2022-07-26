export interface Legend {
  name: string,
  value: number,
  color: LegendColor
}

export enum LegendColor {
  PRINCIPALS = '#1F172E',
  INTERESTS = '#FBEBDC',
  COSTS = '#FF9914',
  OVERPAYMENTS = '#6C9E71'
}