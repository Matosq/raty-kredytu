import { Moment } from "moment";

export interface CreditPeriod {
  startDate: Moment;
  endDate?: Moment;
}
