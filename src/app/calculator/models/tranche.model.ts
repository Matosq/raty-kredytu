import { Moment } from "moment";

export interface Tranche {
    date: Moment,
    percentage: number,
    value: number,
    trancheId: number
  }
  